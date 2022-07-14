# Graphql basics 

Es un lenguaje de consultas para APIS creado por facebook

en graphql solo hay una entrada a la api 
a diferencia de rest que va cambiando la url

install

`npm i apollo-server graphql`

nodemon

`npx nodemon index.js`

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

### Query

- Al buscar queries diferencia mayusculas y minusculas

```
query($name: String!) {
  findPerson(name: $name) {
    name
    city
  }
}
```
variables Headers
```
{
  "name": "Frank"
}
```

### Como funciona un resolvers

root : es lo que se ha resuelto antes "en la query"

en los resolvers se puede hacer la lógica que se haría en el frontend 
?averiguar si es recomendable o buena practica

ayuda a resolver haciendo, lógica o no, entre las consultas que devuelve 

¿como puedes favorece preguntar por los datos?


### Mutations

Es para ingresar datos en GraphQL