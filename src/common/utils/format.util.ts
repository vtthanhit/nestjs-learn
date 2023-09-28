import { HttpStatus } from '@nestjs/common';
import { FormattedExecutionResult, GraphQLFormattedError } from 'graphql';

export function formatGraphqlError(error: GraphQLFormattedError) {
  return {
    message: error.message,
    statusCode:
      error.extensions.status || HttpStatus[error.extensions.code as string],
  };
}

export function formatResponse(response: FormattedExecutionResult) {
  if (response.errors) {
    return JSON.stringify({ errors: response.errors });
  }

  return JSON.stringify({
    data: Object.values(response.data),
  });
}
