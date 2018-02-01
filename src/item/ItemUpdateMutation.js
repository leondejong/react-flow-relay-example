// @flow

import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const mutation: graphql.GraphQLTaggedNode = graphql`
  mutation ItemUpdateMutation($id: ID!, $listId: ID, $name: String, $checked: Boolean) {
    updateItem(id: $id, listId: $listId, name: $name, checked: $checked) {
      id
      listId
      name
      checked
    }
  }
`;

const getOptimisticResponse = (id: string, listId: string, name: string, checked: boolean): Object => {
  return {
    updateItem: {
      item: {
        id,
        listId,
        name,
        checked,
      },
    },
  };
}

const commit = (environment: Environment, id: string, listId: string, name: string, checked: boolean): Function => {
  return commitMutation(
    environment, {
      mutation,
      variables: {
        id,
        listId,
        name,
        checked,
      },
      optimisticResponse: getOptimisticResponse(id, listId, name, checked),
    },
  );
}

export default { commit };
