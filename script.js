const nav=document.querySelector('#main-nav'),menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));

const form=document.querySelector('#onboarding-form'),
steps=[...document.querySelectorAll('.step')],
next=document.querySelector('#next'),
back=document.querySelector('#back'),
fill=document.querySelector('#progress-fill'),
label=document.querySelector('#progress-label'),
percent=document.querySelector('#progress-percent');

let current=1;

function showStep(n){
  current=n;
  steps.forEach((s,i)=>s.classList.toggle('active',i===n-1));
  label.textContent=`${n} de 4`;
  percent.textContent=`${n*25}%`;
  fill.style.width=`${n*25}%`;
  back.classList.toggle('hidden',n===1);
  next.innerHTML=n===4?'Enviar <span>→</span>':'Continuar <span>→</span>';
}

function validStep(){
  return [...steps[current-1].querySelectorAll('input[required],textarea[required]')]
    .every(el=>el.reportValidity());
}

next?.addEventListener('click',()=>{
  if(!validStep())return;

  if(current<4){
    showStep(current+1);
  } else {
    const data = Object.fromEntries(new FormData(form).entries());

    const payload = {
      name: data.name,
      age: data.age,
      email: data.email,
      current: data.current,
      difficulty: data.difficulty,
      goal: data.goal,
      first_change: data.first_change,
      extra: data.extra
    };

    emailjs.send("service_qlnnbte","template_a83sajl",payload)
      .then(()=>{
        document.querySelector('#onboarding').style.display='none';
        document.querySelector('#payment').style.display='block';
        document.querySelector('#payment').scrollIntoView({behavior:'smooth'});
      })
      .catch(()=>alert("Error al enviar."));
  }
});

back?.addEventListener('click',()=>{
  if(current>1)showStep(current-1);
});

document.querySelector('#demo-pay')?.addEventListener('click',()=>{
  document.querySelector('#payment').style.display='none';
  document.querySelector('#preparing').style.display='block';
  document.querySelector('#preparing').scrollIntoView({behavior:'smooth'});
});
