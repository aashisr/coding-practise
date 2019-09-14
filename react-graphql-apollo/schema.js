const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLList } = require('graphql');
const axios = require('axios');

// LAUNCH TYPE
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

// ROCKET TYPE
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// ROOT QUERY to resolve the data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            // GraphQLList to get the list of launches
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches').then((res) => res.data);
            }
        },
        // Get a single launch
        launch: {
            // No need of GraphQLLIst to get a single object
            type: LaunchType,
            // args is the argument or the parameter to the query
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then((res) => res.data);
            }
        },
        rockets: {
            // GraphQLList to get the list of rockets
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets').then((res) => res.data);
            }
        },
        // Get a single rocket
        rocket: {
            // No need of GraphQLLIst to get a single object
            type: RocketType,
            // args is the argument or the parameter to the query
            args: {
                rocket_id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`).then((res) => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
