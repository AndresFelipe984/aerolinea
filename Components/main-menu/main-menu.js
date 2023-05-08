export class MainMenu extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML=/* html*/ `
        <nav class="navbar navbar-expand-lg bg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="/img/logoPrincipal-s.png" alt=""  width="80px"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="customers.html">Clientes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="rutas.html">Rutas</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>        
        `
    }
}
customElements.define("main-menu",MainMenu);