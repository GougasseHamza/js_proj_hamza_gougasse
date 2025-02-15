const config_form = document.getElementById('config-form');
    const quiz_container = document.getElementById('quiz-container');
    const result_container = document.getElementById('result-container');
    const question_area = document.getElementById('question-area');
    const score_display = document.getElementById('score');
    const timer_display = document.getElementById('timer');
    const final_score_display = document.getElementById('final-score');
    const restart_btn = document.getElementById('restart-btn');
  
    
    let start= 0 ; 
    let questions = [];
    let current_question_index = 0;
    let score_val = 0;
    let timer_interval;
    const time_per_question = 20;
    let time_left = time_per_question;

    config_form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // console.log("ok") ;
      let num_questions = document.getElementById('numQuestions').value;
      let category_val = document.getElementById('category').value;
      let difficulty_val = document.getElementById('difficulty').value;
      let type_val = document.getElementById('type').value;
      let encoding_val = document.getElementById('encoding').value;
  
      let api_url = `https://opentdb.com/api.php?amount=${num_questions}`;
      if (category_val)   api_url += `&category=${category_val}`;
      if (difficulty_val) api_url += `&difficulty=${difficulty_val}`;
      if (type_val)       api_url += `&type=${type_val}`;
      
      if (encoding_val && encoding_val !== 'default') {
        if (encoding_val === 'urlLegacy') {
          api_url += '&encode=urlLegacy';
        } else if (encoding_val === 'url3986') {
          api_url += '&encode=url3986';
        } else if (encoding_val === 'base64') {
          api_url += '&encode=base64';
        }
      }

      // sir tqlb 
      let response = await fetch(api_url);
      let data = await response.json();
      questions = data.results;
      
      // reset quiz
      score_val = 0;
      current_question_index = 0;
      score_display.textContent = 'Score: 0';
  
      
      config_form.style.display = 'none';
      quiz_container.style.display = 'block';
      result_container.style.display = 'none';
  
     
      display_question();
    });
  
    // go next qst 
    function display_question() {
      clearInterval(timer_interval);
      time_left = time_per_question;
      timer_display.textContent = 'Temps: ' + time_left + 's';
      start_timer();
      
      if (current_question_index < questions.length) {
        let current_q = questions[current_question_index];
        let question_text = decode_html_entities(current_q.question);
  
        let answers = [...current_q.incorrect_answers, current_q.correct_answer];
        shuffle_array(answers);
  
        let html_content = '<div class="question-container"><div class="question-text">' + question_text + '</div><ul class="options">';
        answers.forEach(function(ans) {
          html_content += '<li><label><input type="radio" name="option" value="' + ans + '" /> ' + decode_html_entities(ans) + '</label></li>';
        });
        html_content += '</ul><button class="btn" id="next-btn">Suivant</button></div>';
  
        question_area.innerHTML = html_content;
        document.getElementById('next-btn').addEventListener('click', next_question);
      } else {
        display_result();
      }
    }
  
    // lwqt
    function start_timer() {
        timer_interval = setInterval(function() {
          time_left--;
          timer_display.textContent = 'Temps: ' + time_left + 's';
      
          if (time_left > 10) {
            timer_display.style.color = 'green';
          } else if (time_left > 5) {
            timer_display.style.color = 'orange';
          } else {
            timer_display.style.color = 'red';
          }
      
          //layshl 
          if (time_left <= 0) {
            clearInterval(timer_interval);
            next_question();
          }
        }, 1000);
      }
      
    // go next qst 
    function next_question() {
      clearInterval(timer_interval);
      let current_q = questions[current_question_index];
      let selected_option = document.querySelector('input[name="option"]:checked');
      if (selected_option && selected_option.value === current_q.correct_answer) {
        score_val++;
        score_display.textContent = 'Score: ' + score_val;
      }
      current_question_index++;
      
      // scroll top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      display_question();
    }
  
    // results
    function display_result() {
      quiz_container.style.display = 'none';
      result_container.style.display = 'block';
      final_score_display.textContent = 'Vous avez obtenu ' + score_val + ' / ' + questions.length + ' points.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    // reset
    restart_btn.addEventListener('click', function() {
      config_form.style.display = 'block';
      quiz_container.style.display = 'none';
      result_container.style.display = 'none';
      config_form.reset();
    });
  
    // shuffle
    function shuffle_array(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  
    // need to decode the txt given by api 
    function decode_html_entities(txt) {
      let txt_area = document.createElement('textarea');
      txt_area.innerHTML = txt;
      return txt_area.value;
    }