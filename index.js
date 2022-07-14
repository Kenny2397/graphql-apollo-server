import { gql, ApolloServer, UserInputError } from "apollo-server";

import { v1 as uuid } from "uuid";

// local database 
const persons = [
    {
        name: 'Jose',
        phone: ' 3434-4234234',
        age: 23,
        street: 'pasaje Testing',
        city: 'Ibiza',
        id: '6546ntjyn6unr6'
    },
    {
        name: 'frank',
        phone: ' 3434-4234234',
        age: 13,
        street: 'calle Testing',
        city: 'Ibiza',
        id: '45345347h65'
    },
    {
        name: 'arevalo',
        phone: ' 3434-4734234',
        age: 20,
        street: 'pasaje Hambuerger',
        city: 'Cali',
        id: '245grret6yuj456234'
    },
    {
        name: 'Juan',
        phone: ' 34774-4234234',
        age: 18,
        street: 'Calleee Testing',
        city: 'Cali',
        id: '245grerret6456234'
    }
];

// 1) Describir los datos
//    Definiciones datos
const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        age: Int
        street: String!
        city: String!
        canDrink: Boolean
        check: String
        address: Address
        id: ID!
    }
    
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            age: Int!
            street: String!
            city: String!
        ): Person
    }
`

// 2) resolvers 
// resolver datos

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const { name } = args

            return persons.find(person => person.name === name)
        }
    },

    Mutation: {
        addPerson: (root, args) => {
            
            if ( persons.find((p) => p.name === args.name) )
            throw new UserInputError(
                'Name nust be unique',
                {
                    invalidArgs: args.name
                })   

            const person = {...args, id: uuid()}

            persons.push(person)

            return person
        }
    },


    // Person: {
    //     name: (root) => root.name
    //     ...
    // }
    Person: {
        // address: (root) => `street: ${root.street}, city: ${root.city}`,
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        },
        check: () => "kenny",
        canDrink: (root) => root.age > 18
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