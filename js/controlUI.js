var btnVerFormulario  = document.getElementById("btnVerFormulario");
var formControls      = document.getElementById("contenedorFormulario");
var btnVerLog         = document.getElementById("btnVerLog");
var formLogs          = document.getElementById("contenedorLog");

function toogleControles(){
  if(!$(formControls).hasClass('active')){ 
      $(formControls).addClass('active');
      $(btnVerFormulario).addClass('active-button');
  }else {
      $(formControls).removeClass('active');
      $(btnVerFormulario).removeClass('active-button');
  }   
  setIconButton($(btnVerFormulario),['left','right']);
}

function toogleLogs(){
  if(!$(formLogs).hasClass('active-log')){ 
      $(formLogs).addClass('active-log');
      $(btnVerLog).addClass('active-button-log');
  }else {
      $(formLogs).removeClass('active-log');
      $(btnVerLog).removeClass('active-button-log');
  }   
  setIconButton($(btnVerLog),['up','down']);
}

function setIconButton(btn,icon){
  var state = $(btn[0].children[0]).hasClass('glyphicon-chevron-'+icon[0]);
  var classIconRemove = 'glyphicon-chevron-'+(state?icon[0]:icon[1]);
  var classIconAdd    = 'glyphicon-chevron-'+(state?icon[1]:icon[0]);

  
  $(btn[0].children[0]).removeClass(classIconRemove).addClass(classIconAdd);
  
}

btnVerFormulario.addEventListener('click',toogleControles);
btnVerLog.addEventListener('click',toogleLogs);