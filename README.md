# fomo sample

Sample UI stack to support conversation happening around UI related architecture.

![UI Architectural Parts](https://user-images.githubusercontent.com/185555/35255403-b8078816-0053-11e8-8dc6-9a1ae33d6aaa.png)

## Sample end-points (live)

* https://fomo.db.team
* https://fomo.db.team/map
* https://fomo-data.db.team

To render a different number of sparklines on the server (initial load) pass the `totalSparklines` querystring, eg

* https://fomo.db.team/?totalSparklines=20

The sparklines are animating from randomly generated values, simulating updates to data pushed from the server.
The pause before they beginnig animating shows the JavaScript download time. Typically in a SPA this is a blank
screen before the UI renders, but in this architecture the initial load state is immediate.

To update the number of sparklines client-side hit one of the test buttons on the left (eg `Show 10`).

## Talking Points

Rough set of discussion topics related to the design in this repo:

* Typescript (with React)
* Server rendering (with next.js)
* Storybook (decomposed, isolated component development)
* Inline CSS
* GraphQL Server (BFF)
  * Server instance
  * Client calling graphql backend.
* Mocking strategy
  * Lighweight API mocking conferred by GraphQL setup
  * Backend system design can be led by API mock design ("graphql first" ... get the product usage scenarios right prior to laying backend systems)
  * Enable parallel development streams behind APIs.
* DevOps

https://fomo.db.team
![Sample](https://user-images.githubusercontent.com/185555/35254815-cbc7e768-0050-11e8-8f76-8578aecdf9ed.png)

https://fomo-data.db.team
![GraphQL](https://user-images.githubusercontent.com/185555/35254860-0247928e-0051-11e8-8463-6a876d3ef9e1.png)

## DataMapper API

https://fomo.db.team/map

![DataMapper](https://user-images.githubusercontent.com/185555/35498405-fb0499f4-0532-11e8-8664-06d13a6ed269.gif)
