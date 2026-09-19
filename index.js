const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// 1. DATOS EN MEMORIA (array de estudiantes)
const estudiantes = [
  { id: "1", nombre: "Sofia", edad: 15 },
  { id: "2", nombre: "Juan", edad: 16 },
  { id: "3", nombre: "Ana", edad: 20 },
  { id: "4", nombre: "Carlos", edad: 17 },
  { id: "5", nombre: "María", edad: 19 }
];

// 2. ESQUEMA (Qué se puede pedir)
const schema = buildSchema(`
  # Definición del tipo Estudiante
  type Estudiante {
    id: ID!
    nombre: String!
    edad: Int!
  }
  
  # Consultas disponibles
  type Query {
    # Retorna TODOS los estudiantes
    estudiantes: [Estudiante!]!
    
    # Retorna un estudiante específico por su ID
    estudiantePorId(id: ID!): Estudiante
  }
`);

// 3. RESOLVERS (La lógica que responde)
const root = {
  // Retorna TODOS los estudiantes
  estudiantes: () => {
    return estudiantes;
  },
  
  // Busca un estudiante por ID (filtro)
  estudiantePorId: ({ id }) => {
    // Busca en el array el estudiante con el ID proporcionado
    const estudiante = estudiantes.find(e => e.id === id);
    
    // Si no existe, retorna null (GraphQL maneja el null correctamente)
    return estudiante || null;
  }
};

// 4. CONFIGURACIÓN DEL SERVIDOR
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log('✅ Servidor GraphQL - Ejercicio 5 (Lista + Filtro por ID)');
  console.log(`📝 Abre http://localhost:${PORT}/graphql en tu navegador`);
  console.log('🔍 Prueba las consultas con filtros por ID');
});