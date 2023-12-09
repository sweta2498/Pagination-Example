export default function App() {
    const [checked, setChecked] = useState([]);
    const checkList = ["Apple", "Banana", "Tea", "Coffee"];
  
    const handleCheck = (event) => {
      var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(updatedList);
    };
    const checkedItems = checked.length
      ? checked.reduce((total, item) => {
          return total + ", " + item;
        })
      : "";
  
    var isChecked = (item) =>
      checked.includes(item) ? "checked-item" : "not-checked-item";
  
    return (
      <div className="app">
        <div className="checkList">
          <div className="title">Your CheckList:</div>
          <div className="list-container">
            {checkList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
        </div>
  
        <div>{`Items checked are: ${checkedItems}`}</div>
      </div>
    );
  }
  