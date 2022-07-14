# Graphql basics 

Es un lenguaje de consultas para APIS creado por facebook

install

`npm i apollo-server graphql`

Steps

### 1) Describir los datos - typeDefs
- describir los datos
- describir las peticiones

```
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
        findPerson(name: string!): Person
    }

`;
```

### 2) De donde sacamos los datos - resolvers 

```
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
    }
}
```

### 3) Apolloserver

El servidor de Apollo es la parte de GraphQL que se ejecuta en el servidor, funcionando a modo de interfaz entre el las peticiones entrantes y tu código backend, encargándose también de enviar de vuelta una respuesta a dichas peticiones.

```
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    // csrfPrevention: true,
    // cache: 'bounded',
});
```

### Server de apollo

```
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
```

