import React from 'react';
import ErrorImg from 'images/error-img'

const ErrorContent = ({ className="session-error", error, type, text=error[type] }) => (
  <>
    {error[type] && <div className={className}>
      <img src={ErrorImg} />
      {text}
    </div>}
  </>
)

const ErrorWrapper = ({ err, type }) => {
  if (Array.isArray(err[type])) {
    return (
      err[type].map(msg => (
        <ErrorWrapper
          key={msg}
          err={{[type]: msg}}
          type={type}
        />
      ))
    )
  } else {
    return (
      <>
        <ErrorContent
          error={err}
          type={type}
        />
      </>
    )
  }
}

const ErrorComponent = ({ errors, errorClass, errorType, errorId }) => {
  if (!errors || Object.keys(errors).length === 0) return null;

  if (errors[errorType] && errors[errorType][errorId]) {
    errors = { [errorClass]: errors[errorType][errorId] };
  } else if (errors[errorType]) {
    return null;
  }

  return (
    <ul className="errors">
      {Object.keys(errors).map((err,idx) => (
        <ErrorWrapper type={err} err={{ [err]: errors[err] }} key={idx} />
      ))}
    </ul>
  );
}

export default ErrorComponent;