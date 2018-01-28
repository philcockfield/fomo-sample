import { expect } from 'chai';
import { Query } from '.';

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
});
