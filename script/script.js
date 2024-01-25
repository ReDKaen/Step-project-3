class Header {
  constructor() {
    this.logBtn = document.querySelector(".header-btn-log");
    this.logMenu = document.querySelector(".header__log-menu");
    this.logForm = document.querySelector(".header__log-menu__form");
    this.createBtn = document.querySelector(".header-btn-create-visit")
    this.modalForm = document.querySelector(".header__modal-form__wrraper")

    this.logBtn.addEventListener("click", this.toggleLogMenu.bind(this));
    this.logForm.addEventListener("submit", this.handleLoginForm.bind(this));
    this.createBtn.addEventListener("click", this.createModalWindow.bind(this));

  }

  toggleLogMenu() {
    this.logMenu.style.display = this.logMenu.style.display === "flex" ? "none" : "flex";
  }

  handleLoginForm(event) {
    event.preventDefault();

    const email = this.logForm.querySelector('input[name="login"]').value;
    const password = this.logForm.querySelector('input[name="password"]').value;

    this.login(email, password);
  }

  createModalWindow(){
    this.modalForm.style.display = this.modalForm.style.display === "none" ? "flex" : "none";
  }

  async login(email, password) {
    try {
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const token = await response.text();
      if (response.ok) {
        this.updateUIOnSuccessfulLogin();
      }
      if (response.ok){
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  updateUIOnSuccessfulLogin() {
    this.logMenu.style.display = "none"
    this.logBtn.style.display = "none"
    this.createBtn.style.display = "block"
  }
}

const header = new Header();
console.log(header);