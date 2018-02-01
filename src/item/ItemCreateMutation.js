// @flow

import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const mutation: graphql.GraphQLTaggedNode = graphql`
  mutation ItemCreateMutation($listId: ID, $name: String, $checked: Boolean) {
    createItem(listId: $listId, name: $name, checked: $checked) {
      id
      listId
      name
      checked
    }
  }
`;

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 8);
}

const getOptimisticResponse = (listId: string, name: string, checked: boolean): Object => {
  return {
    createItem: {
      item: {
        id: generateId(),
        listId,
        name,
        checked,
      },
    },
  };
}

const commit = (environment: Environment, listId: string, name: string, checked: boolean): Function => {
  return commitMutation(
    environment, {
      mutation,
      variables: {
        listId,
        name,
        checked,
      },
      optimisticResponse: getOptimisticResponse(listId, name, checked),
    },
  );
}

export default { commit };
