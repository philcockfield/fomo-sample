import { expect } from 'chai';
import { Query, IDataSet, Mappers } from '.';
import { IQueryChange } from './query';

describe('query.map', () => {
  it('has not mappers', () => {
    expect(Query.create().mappers).to.eql([]);
  });

  it('adds mappers (chained)', () => {
    const query = Query.map({ id: '1' }).map({ id: '2', props: { foo: 123 } });

    expect(query.mappers[0].id).to.eql('1');
    expect(query.mappers[0].props).to.eql({}); // Default (empty object)

    expect(query.mappers[1].id).to.eql('2');
    expect(query.mappers[1].props).to.eql({ foo: 123 });
  });

  it('converts to serializable object', () => {
    const query = Query.map({ id: '1' }).map({ id: '2' });
    const obj = query.toObject();

    expect(obj.mappers).to.eql(query.mappers);
    expect(obj.mappers).not.to.equal(query.mappers);
  });

  it('initializes from serialized mapper', () => {
    const query1 = Query.map({ id: '1' }).map({ id: '2' });
    const query2 = Query.create(query1.toObject());
    expect(query2.mappers).to.eql(query1.mappers);
  });

  it('clears all mappers', () => {
    const query = Query.map({ id: '1' }).map({ id: '2' });
    expect(query.mappers.length).to.eql(2);

    const events: IQueryChange[] = [];
    query.change$.subscribe(e => events.push(e));

    const result = query.clear();
    expect(query.mappers.length).to.eql(0);
    expect(result.mappers.length).to.eql(0);
    expect(events.length).to.eql(1);
    expect(events[0].type).to.eql('CLEARED');
  });
});

describe('query.transform', () => {
  const createDataset = (length: number): IDataSet => {
    const items = Array.from({ length }).map((v, i) => ({
      time: new Date(),
      value: i,
    }));
    return { items };
  };

  const mappers = Mappers
    // Register mappers.
    .create()
    .add<{ by: number }>('increment', async (props, data) => {
      const items = data.items.map(item => ({
        ...item,
        value: item.value + props.by,
      }));
      return { ...data, items };
    });

  it('makes no change to the data when no mappers have been registered', async () => {
    const data = createDataset(3);
    const query = Query.create();
    const result = await query.transform(mappers, data);
    expect(result).to.eql(data);
    expect(result.items[0].value).to.eql(0);
  });

  it('runs a single mapper (increment by 2 from props)', async () => {
    const data = createDataset(3);
    const query = Query.map({ id: 'increment', props: { by: 2 } });
    const result = await query.transform(mappers, data);

    expect(result.items[0].value).to.eql(2);
    expect(result.items[1].value).to.eql(3);
    expect(result.items[2].value).to.eql(4);
  });

  it('runs several mappers', async () => {

    
    const data = createDataset(3);
    const query = Query
      // Add a series of mappers.
      .map({ id: 'increment', props: { by: 10 } })
      .map({ id: 'increment', props: { by: -5 } })
      .map({ id: 'increment', props: { by: 1 } });
    const result = await query.transform(mappers, data);

    expect(result.items[0].value).to.eql(6);
    expect(result.items[1].value).to.eql(7);
    expect(result.items[2].value).to.eql(8);
  });

  it('throws if it tries to map with a non-existent transform', async () => {
    const data = createDataset(3);
    const query = Query
      // Add a series of mappers.
      .map({ id: 'increment', props: { by: 10 } })
      .map({ id: 'does-not-exist' });

    let err: Error | undefined;
    try {
      await query.transform(mappers, data);
    } catch (error) {
      err = error;
    }
    expect(err && err.message).to.contain('has not been registered yet');
  });
});
