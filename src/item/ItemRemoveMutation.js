// @flow

import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const mutation: graphql.GraphQLTaggedNode = graphql`
  mutation ItemRemoveMutation($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const getOptimisticResponse = (id: string): Object => {
  return {
    deleteItem: {
      item: {
        id,
      },
    },
  };
}

const commit = (environment: Environment, id: string): Function => {
  return commitMutation(
    environment, {
      mutation,
      variables: {
        id,
      },
      optimisticResponse: getOptimisticResponse(id),
    },
  );
}

export default { commit };
