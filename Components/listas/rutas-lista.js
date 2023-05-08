import { getDataAll,searchDataById,opc } from '../../Apis/rutas-api.js';

export class RutasLista extends HTMLElement{
    idUsr=0;
    constructor(){
        super();
        this.render();
        this.requestApiGetAeronave();
        this.abrirModal();
        
    }
    render(){
        this.innerHTML = /* html */ `
            <table class="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th>Nro Identificacion</th>    
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>Fecha Nacimiento</th>
                        <th>Ciudad de Origen</th>
                        <th>Pais de Origen</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody id="lista-Aeronave">

                </tbody>
            </table class="table table-bordered border-primary">
            <div class="modal fade " id="putCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card">
                                        <h5 class="card-header">Registro de aeronaves</h5>
                                        <div class="card-body">
                                            <div class="container">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <form id = "frmData">
                                                            <div class="row g-3">
                                                                <div class="col-3">
                                                                    <label for="numAeronave" class="form-label">Numero de aeronave</label>
                                                                    <input type="text" class="form-control" id="numAeronave" name="numAeronave">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="cantPasajeros" class="form-label">Cantidad de pasajeros</label>
                                                                    <input type="text" class="form-control" id="cantPasajeros" name="cantPasajeros">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="fechaCompra" class="form-label">Fecha de compra</label>
                                                                    <input type="text" class="form-control" id="fechaCompra" name="fechaCompra">                  
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <div class="col-4">
                                                                <label for="iden" class="form-label">Valor de compra</label>
                                                                <div class="input-group mb-3">
                                                                    <span class="input-group-text">$</span>
                                                                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                                                                    <span class="input-group-text">.00</span>
                                                                </div>
                                                            </div>
                                                                <div class="col-4">
                                                                    <label for="numMatricula" class="form-label">Numero de matricula </label>
                                                                    <input type="date" class="form-control" id="numMatricula" name="numMatricula">                  
                                                                </div>
                                                                <div class="container mt-4 text-center" >
                                                                    <input type="submit" data-accion="PUT" class="btn btn-warning" value="Editar">
                                                                </div>
                                                            </div>
                                                        </form>                         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                    </div>
                </div>
            </div>        
        `   
    }

    abrirModal = () =>{
        var myModal = document.querySelector('#putCliente')
        myModal.addEventListener('shown.bs.modal', function () {
            //myInput.focus()
        })
    }
    requestApiGetAeronave = () =>{
        getDataAll()
            .then((result)=>{
                this.renderAeronave(result);
            })
    }
    renderAeronaves = (Aeronave)=>{
        let AeronaveHTML = '';
        for(let cliente of Aeronave){
            AeronaveHTML += this.crearListaAeronaveHTML(cliente);
        }
        document.getElementById('lista-Aeronave').innerHTML = AeronaveHTML;
        this.callModal();
        this.putData();
    }
    crearListaAeronaveHTML = (Aeronave)=>{
        let listaHTML = /* html */ `
        <tr>
            <td>${Aeronave.numAeronave}</td>
            <td>${Aeronave.cantPasajeros}</td>
            <td>${Aeronave.fechaCompra}</td>
            <td>${Aeronave.valorCompra}</td>
            <td>${Aeronave.numMatricula}</td>
            <td>
                    <a class="btn btn-success " data-bs-toggle="modal" data-bs-target="#putCliente" id="putData" data-idcli='${Aeronave.id}'><i class='bx bx-edit-alt icono' data-idcli='${Aeronave.id}'></i></a>
                    <a class="btn btn-danger" data-idclidel='${Aeronave.id}'><i class='bx bx-message-alt-x icono'></i></a>
            </td>
            </tr>
        `;
        return listaHTML;
    }
    callModal = () =>{
        document.querySelectorAll('#putData').forEach((item,id) =>{
            item.addEventListener("click",(e) =>{
                this.idUsr=e.target.dataset.idcli;
                this.requestApiGetClienteById(e.target.dataset.idcli);
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })

    }
    requestApiGetClienteById = (id) =>{
        searchDataById(id)
            .then((result)=>{
                this.loadDataFrm(result);
            })
    }
    loadDataFrm(data){
        
        const myForm = document.querySelector("#frmData");
        const {numAeronave,cantPasajeros,fechaCompra,valorCompra,numMatricula} = data;
        const frm = new FormData(myForm);
        frm.set("numAeronave",numAeronave);
        frm.set("cantPasajeros",cantPasajeros);
        frm.set("fechaCompra",fechaCompra);
        frm.set("valorCompra",valorCompra);
        frm.set("numMatricula",numMatricula);
        // Itera a través de los pares clave-valor de los datos
        for (var pair of frm.entries()) {
            // Establece los valores correspondientes en el formulario
            myForm.elements[pair[0]].value = pair[1];
        }

    }
    putData = (id) =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data,this.idUsr);  
        })
    }

}
customElements.define("rutas-lista",RutasListas);