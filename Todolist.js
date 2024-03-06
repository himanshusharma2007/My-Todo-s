
      const title = document.getElementById("title");
      const desc = document.getElementById("desc");
      const todoTableBody = document.getElementById("todoTableBody");

      function displayItems() {
        todoTableBody.innerHTML = ""; // Clear existing rows before re-rendering

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          createTodoItem(key, value);
        }
      }

      function createTodoItem(titleKey, descValue) {
        const date = new Date();
        const hours = date.getHours();
        const minute = date.getMinutes();
        const seconds = date.getSeconds();
        // console.log('date :>> ', );
        const newRow = document.createElement("tr");
        const snoTd = document.createElement("td");
        const titleTd = document.createElement("td");
        const descTd = document.createElement("td");
        const deleteTd = document.createElement("td");
        const todoTime = document.createElement("td");
        todoTime.innerText = `${hours}:${minute}:${seconds}`;
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
        const descValue = desc.value;

        if (titleKey && descValue) {
          localStorage.setItem(titleKey, descValue);
          createTodoItem(titleKey, descValue);
          title.value = "";
          desc.value = "";
        } else {
          alert("Please enter todo details");
        }
      }

