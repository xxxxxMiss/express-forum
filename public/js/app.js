
// Initialize your app
var app = new Framework7({
    router: false,
    material: true,
})
var $ = Dom7

function getModalTemplate(){
  return {
    confirm: `<div class="modal {{#unless buttons}}modal-no-buttons{{/unless}}">
      <div class="modal-inner">
        {{#if title}}
          <div class="modal-title">{{title}}</div>
        {{/if}}
        {{#if text}}
           <div class="modal-text">{{text}}</div>
        {{/if}}
        {{#if afterText}}
          {{afterText}}
        {{/if}}
      </div>
      {{#if buttons}}
        <div class="modal-buttons">
          {{#each buttons}}
            <button class="modal-button {{#if bold}}modal-button-bold{{/if}}">{{text}}</button>
          {{/each}}
        </div>
      {{/if}}
    </div> `
  }
}

// user page
;(function(page){
  if(page == null) return
    
  var upload = document.getElementById('J_upload')
      ,uploadVirtual = document.getElementById('J_uploadVirtual')

  file2DataURL(upload, function(dataUrl){
    uploadVirtual.style.cssText = `
            background: url(${dataUrl}) center no-repeat;
            background-size: cover;
          `
  })

  function file2DataURL(input, fn){
    input.addEventListener('change', function(e){
      var files = e.target.files

      if(files && files.length > 0){
        getBlobData(files[0]).then(function(result){
          fn && fn(result)
        })
      }
    })
  }

  function getBlobData(blob){
    return new Promise(function(resolve, reject){
      var fileReader = new FileReader()

      fileReader.onload = function(){
        resolve(fileReader.result)
      }

      fileReader.onerror = function(e){
        reject(e)
      }

      return fileReader.readAsDataURL(blob)
    })
  }
})(document.querySelector('div[data-page=user]'))

// commets page
;(function(page){
  if(page == null) return

  var btnSend = document.getElementById('J_btnSend')
    ,textarea = document.getElementById('J_textarea')

  textarea.addEventListener('input', function(){
    if(this.value.trim().length > 0){
      btnSend.removeAttribute('disabled')
    }else{
      btnSend.setAttribute('disabled', 'disabled')
    }
  })
})(document.querySelector('div[data-page=comments]'))

// ask page
;(function(page){
  if(page == null) return

  // trigger automatically computed
  var askContent = document.getElementById('J_askContent')
    ,content = askContent.value
  askContent.value = ''
  askContent.value = content
})(document.querySelector('div[data-page=ask]'))
