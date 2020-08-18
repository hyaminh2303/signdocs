/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  DemoButton,
  SignUpFields,
  PasswordFields,
  HelperText,
} from './helperComponents';

const SessionForm = (props) => {
  const {
    formType,
    processForm,
    history,
    generateBob,
    email: propsEmail,
  } = props;
  const [state, setState] = useState({
    email: propsEmail || '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setState({ ...state, [name]: value });
  };

  // const handleDemoUser = (e) => {
  //   debugger;
  //   e.preventDefault();
  //   const bob = generateBob();
  //   setState({ ...bob });
  //   handleSubmit(e);
  // };

  const clearPassword = () =>
    setState((oldState) => ({ ...oldState, password: '' }));

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { ...state };
    if (e.target.name === 'demoBtn') {
      user = generateBob();
    }
    setSubmitting(true);
    processForm(user)
      .then(() => {
        history.push('/');
      })
      .fail(() => {
        setSubmitting(false);
        clearPassword();
      });
  };

  let buttonText = 'Sign in';
  let headerText = <h1>Please sign in to your account</h1>;
  let helmetText = 'SignDocs - Sign in';

  const isSignUp = formType === 'SIGN_UP';

  if (isSignUp) {
    headerText = (
      <>
        <h1>Try DocuSign free for 30 days</h1>
        <p>
          <strong>No obligation, no credit card required</strong>
        </p>
      </>
    );
    buttonText = 'Get started';
    helmetText = 'SignDocs - Sign up for free';
  }

  const footer = (
    <div className="footer-links">
      {isSignUp ? (
        <p>
          Have an account already? <Link to="/signin">Sign in</Link>
        </p>
      ) : (
        <>
          <p>
            Don&apos;t have an account yet?{' '}
            <Link to="/signup">Sign up for free</Link>
          </p>
          <p>
            <Link to="/signin">Forgot my password</Link>
          </p>
        </>
      )}
    </div>
  );

  const { email, password } = state;

  return (
    <div className="session-form">
      <Helmet>
        <title>{`${helmetText}`}</title>
      </Helmet>
      {headerText}
      <form onSubmit={handleSubmit}>
        <SignUpFields
          state={state}
          handleChange={handleChange}
          isSignUp={isSignUp}
          HelperText={HelperText}
        />
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <HelperText field="email" />
        <PasswordFields
          isSignUp={isSignUp}
          password={password}
          handleChange={handleChange}
          state={state}
        />
        <button type="submit" disabled={submitting}>
          {buttonText}
        </button>
        <DemoButton
          isSignUp={isSignUp}
          handleSubmit={handleSubmit}
          submitting={submitting}
        />
      </form>
      {footer}
    </div>
  );
};

SessionForm.propTypes = {
  formType: PropTypes.string.isRequired,
  processForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  email: PropTypes.string,
  generateBob: PropTypes.func,
};

SessionForm.defaultProps = {
  email: '',
  generateBob: () => {},
};

export default SessionForm;
