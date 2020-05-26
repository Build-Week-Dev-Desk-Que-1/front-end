import React, { useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";
import Ticket from "./Ticket";

const TicketList = () => {
  const { tickets, toggleItem } = useContext(TicketContext);

  return (
    <>
      {tickets.map(ticket => {
        {/* console.log(ticket); */}
        return (
          <>
            <div
              
              onClick={() => {
                toggleItem(ticket.id);
              }}
            >
              <div >
                  {/* How to display if it's done or not */}
              <h1 className={`resolved${ticket.resolved ? "-on" : ""}`}>Resolved!</h1>
                <h4>{ticket.category}</h4>
                <p> {ticket.title}</p>
              </div>

              <div>
                <h5 > {ticket.assigned}</h5>
              </div>
            </div>
            <Ticket ticket={ticket} />
          </>
        );
      })}
    </>
  );
};

export default TicketList;