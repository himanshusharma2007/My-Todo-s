
      const title = document.getElementById("title");
      const desc = document.getElementById("desc");
      const todoTableBody = document.getElementById("todoTableBody");

      function displayItems() {
        todoTableBody.innerHTML = ""; // Clear existing rows before re-rendering
        if(localStorage.length > 0){
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const retrievedValuesString = localStorage.getItem(key);
      
            // Check if retrievedValuesString is not null or undefined
            if (retrievedValuesString) {
              const retrievedValues = JSON.parse(retrievedValuesString);
              createTodoItem(key, retrievedValues[0], retrievedValues[1]);
            } else {
              console.error(`Error parsing JSON for key: ${key}`);
            }
          }
        }else{
          console.log('error undefined');
          alert('Todo is empty');
        }
      }
      

      function createTodoItem(titleKey, descValue,addtime) {
 
        // console.log('date :>> ', );
        const newRow = document.createElement("tr");
        const snoTd = document.createElement("td");
        const titleTd = document.createElement("td");
        const descTd = document.createElement("td");
        const deleteTd = document.createElement("td");
        const todoTime = document.createElement("td");
        todoTime.innerText = addtime;
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btnClass");
        deleteBtn.innerText = "Delete";
        deleteTd.appendChild(deleteBtn);

        snoTd.innerText = todoTableBody.children.length + 1;
        titleTd.innerText = titleKey;
        descTd.innerText = descValue;

        newRow.appendChild(snoTd);
        newRow.appendChild(titleTd);
        newRow.appendChild(descTd);
        newRow.appendChild(deleteTd);
        newRow.appendChild(todoTime);

        todoTableBody.appendChild(newRow);

        deleteBtn.addEventListener("click", () => {
          localStorage.removeItem(titleKey);
          displayItems(); // Update the display after deletion
        });
      }

      function addItem() {
        const titleKey = title.value;
        const date = new Date();
        const hours = date.getHours();
        const minute = date.getMinutes();
        const seconds = date.getSeconds();
        const addtime=  `${hours}:${minute}:${seconds}`;
       
        const Values = [desc.value,addtime];
        const valuesString = JSON.stringify(Values);

        
        if (titleKey && valuesString) {
          localStorage.setItem(titleKey, valuesString);
          const retrievedValuesString = localStorage.getItem(titleKey);
          const retrievedValues = JSON.parse(retrievedValuesString);
          createTodoItem(titleKey, retrievedValues[0],retrievedValues[1]);
          title.value = "";
          desc.value = "";
        } else {
          alert("Please enter todo details");
        }
      }

