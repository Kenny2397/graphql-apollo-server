import { gql } from "apollo-server";
import { ApolloServer } from "apollo-server";

// local database 
const persons = [
    {
        name: 'Jose',
        phone: ' 3434-4234234',
        street: 'pasaje Testing',
        city: 'Ibiza',
        id: '6546ntjyn6unr6'
    },
    {
        name: 'frank',
        phone: ' 3434-4234234',
        street: 'calle Testing',
        city: 'Ibiza',
        id: '45345347h65'
    },
    {
        name: 'arevalo',
        phone: ' 3434-4734234',
        street: 'pasaje Hambuerger',
        city: 'Cali',
        id: '245grret6yuj456234'
    },
    {
        name: 'Juan',
        phone: ' 34774-4234234',
        street: 'Calleee Testing',
        city: 'Cali',
        id: '245grerret6456234'
    }
];

// 1) Describir los datos
//    Definiciones datos
const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }
    
    type Query {
        personCount: Int!
        allPersons: [Person]!
        
    }

`

// 2) resolvers
// resolver datos

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
    }
}

// ApolloServer
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
    // csrfPrevention: true,
    // cache: 'bounded',
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
});