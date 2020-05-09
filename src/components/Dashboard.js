import React, { Fragment } from 'react'
import Modal from './Modal'
const Row = ({
  FirstName,
  LastName,
  Email,
  PhoneNumber,
  Status,
  remove,
  edit,
  idIndex,
}) => (
  <div className='data-container'>
    <div className='common-row'>{FirstName}</div>

    <div className='common-row'>{LastName}</div>

    <div className='common-row'>{Email}</div>

    <div className='common-row'>{PhoneNumber}</div>

    <div className='common-row'>{Status}</div>

    <div className='common-row'>
      <a href='#' className='editableClass' onClick={() => remove(idIndex)}>
        Delete
      </a>
      <a href='#' className='editableClass' onClick={(e) => edit(idIndex)}>
        Edit
      </a>
    </div>
  </div>
)

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          FirstName: 'abc',
          LastName: 'xyz',
          Email: 'abc@gmail.com',
          PhoneNumber: '9167543678',
          Status: 'De-active',
        },
        {
          FirstName: 'Chandan',
          LastName: 'Kumar',
          Email: 'ckr@gmail.com',
          PhoneNumber: '9167543678',
          Status: 'Active',
        },
        {
          FirstName: 'Chandan',
          LastName: 'Singh',
          Email: 'chandan123@gmail.com',
          PhoneNumber: '9123456789',
          Status: 'Active',
        },
        {
          FirstName: 'Chandan',
          LastName: 'Singh',
          Email: 'chandanks@gmail.com',
          PhoneNumber: '9123456789',
          Status: 'Active',
        },
      ],
      modal: false,
      modalFirstInputName: '',
      modalLastInputName: '',
      modalEmail: '',
      modalPhoneNumber: '',
      modalStatus: '',
      edited: {},
      editable: false,
      index: 0,
      headerDetails: '',
      visible: false,
    }
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  handleFirstNameChange(e) {
    this.setState({ modalFirstInputName: e.target.value })
  }
  handleLastNameChange(e) {
    this.setState({ modalLastInputName: e.target.value })
  }
  handleEmailChange(e) {
    this.setState({ modalEmail: e.target.value })
  }
  handlePhoneNumberChange(e) {
    this.setState({ modalPhoneNumber: e.target.value })
  }
  handleStatusChange() {
    if (this.state.visible) {
      this.setState({ visible: false })
      this.setState({ modalStatus: 'De-active' })
    } else {
      this.setState({ visible: true })
      this.setState({ modalStatus: 'Active' })
    }
  }
  handleSubmit(e) {
    let arr = []
    let data = {}
    if (
      this.state.modalFirstInputName !== '' &&
      this.state.modalLastInputName !== '' &&
      this.state.modalPhoneNumber !== '' &&
      this.state.modalEmail !== ''
    ) {
      if (this.state.editable) {
        data = {
          FirstName: this.state.modalFirstInputName,
          LastName: this.state.modalLastInputName,
          Email: this.state.modalEmail,
          PhoneNumber: this.state.modalPhoneNumber,
          Status: this.state.modalStatus,
        }
        this.state.data.splice(this.state.index, 1, data)
      } else {
        data = {
          FirstName: this.state.modalFirstInputName,
          LastName: this.state.modalLastInputName,
          Email: this.state.modalEmail,
          PhoneNumber: this.state.modalPhoneNumber,
          Status: this.state.modalStatus,
        }
        let joined = this.state.data.concat(data)
        this.setState({ data: joined })
      }

      this.modalClose()
    } else {
      alert('Please fill all required details')
    }
  }
  modalOpen(e) {
    let operation = e.target.innerHTML

    if (operation == 'Add Contact') {
      this.setState({
        modalFirstInputName: '',
        modalLastInputName: '',
        modalEmail: '',
        modalPhoneNumber: '',
        modalStatus: 'De-active',
        visible: false,
      })
    }
    this.setState({ headerDetails: 'Add new contact' })
    this.setState({ modal: true })
    this.setState({ editable: false })
  }

  modalClose() {
    this.setState({
      modalInputName: '',
      modal: false,
    })
  }

  remove = (idIndex) => {
    const id = idIndex
    const arrayCopy = this.state.data.filter((row, index) => id !== index)

    this.setState({ data: arrayCopy })
  }
  edit = (idIndex) => {
    const id = idIndex
    const arrayCopy = this.state.data.filter((row, index) => {
      if (id == index) {
        return row
      }
    })
    this.setState({ headerDetails: 'Edit contact' })
    let copy = arrayCopy[0]
    this.state.edited = Object.assign({}, copy)

    this.setState({
      modal: true,
      editable: true,
      modalFirstInputName: this.state.edited.FirstName,
      modalLastInputName: this.state.edited.LastName,
      modalEmail: this.state.edited.Email,
      modalPhoneNumber: this.state.edited.PhoneNumber,
      modalStatus: this.state.edited.Status,
      index: id,
    })
  }

  render() {
    const rows = this.state.data.map((rowData, index) => (
      <Row
        key={index.toString()}
        remove={this.remove}
        edit={this.edit}
        {...rowData}
        idIndex={index}
      />
    ))

    return (
      <div className='container'>
        <button
          className='modal-button-open'
          onClick={(e) => this.modalOpen(e)}>
          Add Contact
        </button>

        <Modal show={this.state.modal} handleClose={(e) => this.modalClose(e)}>
          <h2 className='content'>{this.state.headerDetails}</h2>
          <div className='form-group '>
            <input
              type='text'
              value={this.state.modalFirstInputName}
              name='modalFirstInputName'
              onChange={(e) => this.handleFirstNameChange(e)}
              className='form-control'
              placeholder='Enter first name'
            />

            <input
              type='text'
              value={this.state.modalLastInputName}
              name='modalLastInputName'
              onChange={(e) => this.handleLastNameChange(e)}
              className='form-control'
              placeholder='Enter last name'
            />

            <input
              type='email'
              value={this.state.modalEmail}
              name='modalEmail'
              onChange={(e) => this.handleEmailChange(e)}
              className='form-control'
              placeholder='Enter email'
            />

            <input
              type='text'
              value={this.state.modalPhoneNumber}
              name='modalPhoneNumber'
              onChange={(e) => this.handlePhoneNumberChange(e)}
              className='form-control'
              placeholder='Enter phone number'
            />

            <input
              type='button'
              value={this.state.modalStatus}
              name='modalStatus'
              onClick={this.handleStatusChange}
              className='form-control typeBtn'
              placeholder='Enter Status'
            />
          </div>

          <div className='btn'>
            <button
              onClick={(e) => this.handleSubmit(e)}
              className='modal-button'>
              Save
            </button>
          </div>
        </Modal>

        <br />
        <br />
        {this.state.data.length > 0 && (
          <div className='table-container'>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Status</div>
          </div>
        )}
        {rows}
      </div>
    )
  }
}
