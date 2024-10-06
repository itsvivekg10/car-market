import React, { useState } from "react";

const Calculator = () => {
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();

    const loanAmount = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const payment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        padding: "20px",
        marginLeft: "50px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        marginTop: "30px",
      }}
    >
      <h2>Financial Calculator</h2>
      <form onSubmit={calculatePayment}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <input
            type="number"
            placeholder="Price $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Interest Rate %"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <input
            type="number"
            placeholder="Loan Term (Months)"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Down Payment $"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#3367d6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </form>
      {monthlyPayment && (
        <div style={{ marginTop: "20px" }}>
          <h3>Estimated Monthly Payment: ${monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
