export const ServerErrorDefaults = {
  defaultMessage: 'An unexpected error occurred. Please try again later.',
  systemErrorCode: 'SERVER_ERROR',
  statusCode: 500,
  name: 'ServerException',
}

export const BadInputDefaults = {
  defaultMessage: 'The request was invalid. Please try again.',
  systemErrorCode: 'BAD_INPUT',
  statusCode: 400,
  name: 'BadInput',
}

export const NotFoundDefaults = {
  defaultMessage: 'The requested resource was not found.',
  systemErrorCode: 'NOT_FOUND',
  statusCode: 404,
  name: 'NotFound',
}

export const UnauthorizedDefaults = {
  defaultMessage: 'You are not authorized to access this resource.',
  systemErrorCode: 'UNAUTHORIZED',
  statusCode: 401,
  name: 'Unauthorized',
}
