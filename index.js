const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const Post = require('./models/Post');
const User = require('./models/User');
const { MONGODB } = require('./config');



const resolvers = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
                
            }
        }
    }
}

const server  = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true, })
        .then(() => {
            console.log('MongoDB Connected');
            server.listen({ port: 5000 
            })
                .then((res) => {
                    console.log(`Server running at ${res.url}`);
            });
    });