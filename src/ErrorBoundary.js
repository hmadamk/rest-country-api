import React from 'react'

function ErrorBoundary(props) {
  if (props.error) {
    return (
      <div>
        <p>We are having problems please restart the page</p>
        <p>if the problem isn&apos;t solved please report to us at <span>email@email.com</span></p>
      </div>
    )

  }
  return (
    <>{props.children}</>
  )
}

export default ErrorBoundary