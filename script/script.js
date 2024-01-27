class Header {
  constructor() {
    this.logBtn = document.querySelector(".header-btn-log");
    this.logMenu = document.querySelector(".header__log-menu");
    this.logForm = document.querySelector(".header__log-menu__form");
    this.createBtn = document.querySelector(".header-btn-create-visit")
    this.modalForm = document.querySelector(".header__modal-form__wrraper")
    this.closeModalBtn = document.querySelector(".header__modal-form__close-btn")
    this.modalFormWrraper = document.querySelector(".header__modal-form__wrraper")

    this.logBtn.addEventListener("click", this.toggleLogMenu.bind(this));
    this.logForm.addEventListener("submit", this.handleLoginForm.bind(this));
    this.createBtn.addEventListener("click", this.createModalWindow.bind(this));
    this.closeModalBtn.addEventListener("click", this.closeModalWindow.bind(this))
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

  closeModalWindow(){
    this.modalFormWrraper.style.display = "none"
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
      if (response.ok) {
        const token = await response.text();
        this.updateUIOnSuccessfulLogin();
        this.saveTokenToLocalStorage(token)
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  saveTokenToLocalStorage(token){
    localStorage.setItem("token", token)
  }
  loadTokenToLoacalStorage(){
    return localStorage.getItem("token")
  }
  updateUIOnSuccessfulLogin() {
    this.logMenu.style.display = "none"
    this.logBtn.style.display = "none"
    this.createBtn.style.display = "block"
  }
}

class Modal extends Header{
  constructor() {
    super();
    this.modalForm = document.querySelector(".header__modal-form__wrapper");
    this.closeModalBtn = document.querySelector(".header__modal-form__close-btn");

    this.closeModalBtn.addEventListener("click", this.closeModalWindow.bind(this));
  }
  createModalWindow() {
    this.modalForm.style.display = this.modalForm.style.display === "none" ? "flex" : "none";
  }

  closeModalWindow() {
    this.modalFormWrapper.style.display = "none";
  }
}

const header = new Header();

const savedToken = header.loadTokenToLoacalStorage();
if (savedToken) {
  header.updateUIOnSuccessfulLogin();
}