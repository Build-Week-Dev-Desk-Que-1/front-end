import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';

const Ticket = ({ ticket }) => {
  const { resolveTicket, assignHelper, reassign, deleteTicket, user, role } = useContext(TicketContext);
  // console.log(user);
  // console.log(ticket);

  return (
    <div className={`bigCard${ticket.clicked ? 'On' : ''}`}>
      <h2>
        <strong>{ticket.category}</strong>
      </h2>
      <p>{ticket.title}</p>
      <br />
      <h5>Description of Issue</h5>
      <p>{ticket.description}</p>
      <br />
      <div>
        <h5>What I've tried</h5>
        <p>{ticket.tried}</p>
      </div>
      <h6 id="unAS"> {ticket.assigned}</h6>

      <div className={`helper${role === 'helper' ? '-on' : ''}`}>
        <button id="help-buttons" onClick={() => assignHelper(ticket.id, user)}>
          Help Student
        </button>
        <button id="help-buttons" onClick={() => resolveTicket(ticket.id)}>
          Resolved
        </button>
        <button id="help-buttons" onClick={() => reassign(ticket.id)}>
          Reassign
        </button>
        <button id="help-buttons" onClick={() => deleteTicket(ticket.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Ticket;