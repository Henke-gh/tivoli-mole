import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TestArea from "./components/TestArea/TestArea";
import TransactionForm from "./components/TransactionForm/TransactionForm";

function App() {
  return (
    <>
      <Header />
      <h1>Whack-a-Mole!</h1>
      <TestArea>
        <TransactionForm />
      </TestArea>
      <Footer />
    </>
  );
}

export default App;
