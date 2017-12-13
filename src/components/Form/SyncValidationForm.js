import React from 'react'
import {Field, reduxForm} from 'redux-form'

const validate = values => {
  const requiredMsg = "Este campo é obrigatório";
  const errors = {}
  if (!values.nome) {
    errors.nome = requiredMsg
  }
  if (!values.email) {
    errors.email = requiredMsg
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Endereço de e-mail inválido'
  }
  if (!values.idade) {
    errors.idade = requiredMsg
  } else if (isNaN(Number(values.idade))) {
    errors.idade = 'O campo deve ser um número'
  } else if (Number(values.idade) < 18) {
    errors.idade = 'Desculpe, você precisa ter mais de 18 anos de idade'
  }
  if (!values.quantidade) {
    errors.quantidade = requiredMsg
  }
  if (!values.file) {
    errors.file = requiredMsg
  } else if (values.file.type !== "application/zip") {
    errors.file = "Arquivo de formato inválido, apeas arquivos .zip"
  }

  return errors
}

const warn = values => {
  const warnings = {}
  if (values.idade < 19) {
    warnings.idade = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
                       input,
                       label,
                       type,
                       meta: {touched, error, warning}
                     }) => (
  <div>
    <label className='mt-3' htmlFor={input.name}>{label}</label>
    <input {...input} id={input.name} placeholder={label} type={type}
           className={`form-control ${touched && ((error && 'is-invalid'))}`}
    />

    {touched && ((error && <span className='text-danger'>{error}</span>) || (warning &&
      <span className='text-warning'>{warning}</span>))}
  </div>
)

const renderSelectField = ({
                             input,
                             label,
                             meta: {touched, error, warning},
                             children,
                             ...custom
                           }) => (
  <div>
    <label className='mt-3' htmlFor={input.name}>{label}</label>
    <select {...input} id={input.name} placeholder={label}
            className={`form-control ${touched && ((error && 'is-invalid'))}`} children={children} {...custom} />
    {touched && ((error && <span className='text-danger'>{error}</span>) || (warning &&
      <span className='text-warning'>{warning}</span>))}
  </div>
)

const adaptFileEventToValue = delegate => (
  e => delegate(e.target.files[0])
)

const FileInput = ({
                     label,
                     input: {
                       value: omitValue,
                       onChange,
                       onBlur,
                       ...inputProps,
                     },
                     meta: {omitMeta, touched, error, warning},
                     ...props,
                   }) => (
  <div>
    <label className='mt-3'>{label}</label>
    <input onChange={adaptFileEventToValue(onChange)} onBlur={adaptFileEventToValue(onBlur)}
           type="file" {...inputProps} {...props} className={`form-control ${touched && ((error && 'is-invalid'))}`}/>
    <small className='d-block'>Apenas arquivos .zip</small>
    {touched && ((error && <span className='text-danger'>{error}</span>) || (warning &&
      <span className='text-warning'>{warning}</span>))}
  </div>
)

const SyncValidationForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="nome" type="text" component={renderField} label="Nome Completo"/>
      <Field name="email" type="email" component={renderField} label="E-mail"/>
      <Field name="idade" type="number" component={renderField} label="Idade"/>

      <Field name="quantidade" component={renderSelectField} label="Quantidade">
        <option value="">Selecione uma quantidade</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>

      <Field name="file" label="Arquivo" component={FileInput}/>


      <div className='text-center mt-3'>
        <button type="submit" disabled={submitting} className='btn btn-success mr-md-3'>
          Enviar
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset} className='btn btn-secondary'>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
})(SyncValidationForm)
