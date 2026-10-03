/* ========================================
   Client Partners English Site - FAQ Chatbot
   Scripted FAQ bot: quick-reply buttons + keyword matching.
   Self-contained: injects its own styles. No server, no API.

   * 回答内容の編集方法
   下の CHATBOT_DATA を書き換えるだけでOKです。
   - label   : ボタンに表示される文字
   - keywords: 入力文からこの話題を検出する単語（小文字）
   - answer  : 回答本文（HTML可）。リンクは <a href="..."> で
   - suggest : 回答後に出す関連ボタン（他トピックのid）
   ======================================== */

(function () {
  'use strict';

  var CONTACT_URL = '/english/contact.html';
  var PHONE_DISPLAY = '03-5909-2320';
  var PHONE_TEL = 'tel:03-5909-2320';

  /* ============ EDIT HERE: FAQ DATA ============ */

  var CHATBOT_DATA = {
    greeting:
      'Hello! Welcome to Client Partners \u2014 the Women-only Handymen in Japan. ' +
      'How can I help you today?',
    fallback:
      'Sorry, I don\u2019t have an answer for that yet. ' +
      'Our team is happy to help you directly \u2014 please use our ' +
      '<a href="' + CONTACT_URL + '">contact form</a> or call us at ' +
      '<a href="' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a> (10:00\u201323:00).',
    initialTopics: ['services', 'pricing', 'booking', 'locations', 'human'],
    topics: [
      {
        id: 'about',
        label: 'About Client Partners',
        keywords: ['about', 'company', 'who', 'women', 'client partners', 'history'],
        answer:
          'Client Partners is a women-only handyman and life-support service, ' +
          'founded in 2009 and operating across Japan. All of our staff are women, ' +
          'and we work with the motto of "Humility, Tolerance, and Sincerity". ' +
          'Read more on our <a href="/english/about.html">About Us page</a>.',
        suggest: ['services', 'locations', 'booking']
      },
      {
        id: 'services',
        label: 'What services do you offer?',
        keywords: ['service', 'services', 'help', 'what can', 'offer', 'support', 'do for me'],
        answer:
          'We support a wide variety of needs:<br>' +
          '・ Daily life support (housekeeping, shopping, nursing care)<br>' +
          '・ Mental health support (talking companion, advice)<br>' +
          '・ Accompaniment (tours, events, hospitals)<br>' +
          '・ Communication support (interpretation, translation)<br>' +
          '・ Business support<br>' +
          'Plus our featured services: Rent-a-Friend, Rent-a-Family and OK Grandma.',
        suggest: ['friend', 'family', 'grandma', 'pricing']
      },
      {
        id: 'friend',
        label: 'Rent-a-Friend',
        keywords: ['friend', 'tour', 'guide', 'companion', 'interpreter', 'sightseeing', 'travel'],
        answer:
          'Rent-a-Friend gives you a Japanese-speaking friend who can show you around, ' +
          'join you for meals or events, or interpret in business settings. ' +
          'Details: <a href="/english/rent-a-friend.html">Rent-a-Friend page</a>.',
        suggest: ['pricing', 'booking', 'family']
      },
      {
        id: 'family',
        label: 'Rent-a-Family',
        keywords: ['family', 'wedding', 'ceremony', 'relative', 'parent', 'mother', 'father'],
        answer:
          'Rent-a-Family provides warm, professional staff who can attend important ' +
          'occasions as your family, or offer you the experience of authentic Japanese ' +
          'family life. Details: <a href="/english/rent-a-family.html">Rent-a-Family page</a>.',
        suggest: ['pricing', 'booking', 'grandma']
      },
      {
        id: 'grandma',
        label: 'OK Grandma',
        keywords: ['grandma', 'grandmother', 'elderly', 'senior', 'cooking', 'okgrandma'],
        answer:
          'OK Grandma is our over-60s department, established in 2011. Experienced ' +
          'grandmas offer childcare support, home cooking, life advice, warm conversation ' +
          'and more. Details: <a href="/english/ok-grandma.html">OK Grandma page</a>.',
        suggest: ['pricing', 'booking', 'services']
      },
      {
        id: 'pricing',
        label: 'Pricing',
        keywords: ['price', 'pricing', 'cost', 'fee', 'charge', 'how much', 'pay', 'rate', 'yen'],
        answer:
          'Our basic charge is: travel expenses from 3,000 yen + basic charge from ' +
          '3,000 yen/hour (excl. tax). The final price depends on location, time and ' +
          'content \u2014 please <a href="' + CONTACT_URL + '">contact us</a> for a quote. ' +
          'PayPal prepayment is available.',
        suggest: ['payment', 'booking', 'human']
      },
      {
        id: 'payment',
        label: 'Payment methods',
        keywords: ['payment', 'paypal', 'credit', 'card', 'cash', 'prepay'],
        answer:
          'PayPal prepayment is available, so you can pay safely online before your ' +
          'service. For other payment questions, please ' +
          '<a href="' + CONTACT_URL + '">contact us</a>.',
        suggest: ['pricing', 'booking']
      },
      {
        id: 'booking',
        label: 'How do I book?',
        keywords: ['book', 'booking', 'reserve', 'reservation', 'request', 'order', 'apply', 'start'],
        answer:
          'Booking is simple:<br>' +
          '1. Send us your request via the <a href="' + CONTACT_URL + '">contact form</a><br>' +
          '2. We match you with the right staff member<br>' +
          '3. Confirm the schedule and meeting place<br>' +
          '4. Enjoy the service!<br>' +
          'Please include your preferred date, location and details in the form.',
        suggest: ['pricing', 'english', 'locations']
      },
      {
        id: 'locations',
        label: 'Offices & hours',
        keywords: ['office', 'location', 'where', 'tokyo', 'osaka', 'kobe', 'fukuoka', 'shinjuku', 'hours', 'open', 'address', 'map'],
        answer:
          'We have main offices in Tokyo (Shinjuku), Osaka (Umeda), Kobe (Sannomiya) ' +
          'and Fukuoka (Tenjin). Reception hours: 10:00\u201323:00. The first 30 minutes ' +
          'of consultation at our Tokyo head office is free. ' +
          'See the <a href="/english/access.html">Access page</a> for maps and details.',
        suggest: ['booking', 'human']
      },
      {
        id: 'english',
        label: 'English support',
        keywords: ['english', 'language', 'japanese', 'speak', 'languages', 'chinese', 'korean'],
        answer:
          'Yes \u2014 we have staff who speak English and other languages. Please note ' +
          'that an English-speaking staff member may not always be available by phone, ' +
          'so for inquiries in English we recommend the ' +
          '<a href="' + CONTACT_URL + '">contact form</a>.',
        suggest: ['booking', 'services']
      },
      {
        id: 'privacy',
        label: 'Privacy & confidentiality',
        keywords: ['privacy', 'confidential', 'secret', 'nda', 'personal', 'information', 'safe'],
        answer:
          'We take your privacy very seriously. Our staff keep all client information ' +
          'strictly confidential, and we can arrange non-disclosure agreements for ' +
          'customers who need them. See our ' +
          '<a href="/english/privacy-policy.html">Privacy Policy</a>.',
        suggest: ['booking', 'human']
      },
      {
        id: 'human',
        label: 'Talk to a human',
        keywords: ['human', 'staff', 'person', 'contact', 'call', 'phone', 'email', 'mail', 'talk'],
        answer:
          'Of course! You can reach our team here:<br>' +
          '・ <a href="' + CONTACT_URL + '">Contact form</a> (recommended for English)<br>' +
          '・ Phone: <a href="' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a> (10:00\u201323:00)<br>' +
          '・ Email: <a href="mailto:cp.otoiawase@gmail.com">cp.otoiawase@gmail.com</a>',
        suggest: []
      }
    ],
    smalltalk: [
      {
        keywords: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'good evening', 'konnichiwa'],
        answer: 'Hello! What would you like to know about Client Partners?'
      },
      {
        keywords: ['thank', 'thanks', 'arigato'],
        answer:
          'You\u2019re very welcome! If you have any other questions, just ask \u2014 ' +
          'or feel free to <a href="' + CONTACT_URL + '">contact our team</a> anytime.'
      }
    ]
  };

  /* ============ END OF FAQ DATA ============ */

  var STYLE_CSS =
    '.cp-chat-panel{position:fixed;bottom:100px;right:24px;width:360px;max-width:calc(100vw - 32px);' +
    'height:520px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,0.22);display:none;flex-direction:column;overflow:hidden;' +
    'z-index:950;font-family:"Noto Sans JP",-apple-system,sans-serif;}' +
    '.cp-chat-panel.cp-open{display:flex;}' +
    '.cp-chat-header{background:#FFAB00;color:#fff;padding:14px 18px;display:flex;' +
    'align-items:center;justify-content:space-between;}' +
    '.cp-chat-header strong{font-size:15px;font-weight:700;}' +
    '.cp-chat-header small{display:block;font-size:11px;font-weight:400;opacity:.9;}' +
    '.cp-chat-close{background:none;border:none;color:#fff;font-size:22px;line-height:1;' +
    'cursor:pointer;padding:4px;}' +
    '.cp-chat-body{flex:1;overflow-y:auto;padding:16px;background:#F9F5F3;}' +
    '.cp-msg{max-width:85%;margin-bottom:10px;padding:10px 14px;border-radius:14px;' +
    'font-size:13.5px;line-height:1.7;word-wrap:break-word;}' +
    '.cp-msg-bot{background:#fff;color:#333;border-bottom-left-radius:4px;' +
    'box-shadow:0 1px 4px rgba(0,0,0,0.06);}' +
    '.cp-msg-user{background:#FFAB00;color:#fff;margin-left:auto;border-bottom-right-radius:4px;}' +
    '.cp-msg-bot a{color:#FFAB00;font-weight:600;text-decoration:underline;}' +
    '.cp-quick{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 12px;}' +
    '.cp-quick button{background:#fff;border:1px solid #FFAB00;color:#FFAB00;border-radius:50px;' +
    'padding:7px 14px;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .2s;}' +
    '.cp-quick button:hover{background:#FFAB00;color:#fff;}' +
    '.cp-chat-input{display:flex;border-top:1px solid #eee;background:#fff;}' +
    '.cp-chat-input input{flex:1;border:none;padding:14px 16px;font-size:14px;outline:none;' +
    'font-family:inherit;}' +
    '.cp-chat-input button{background:none;border:none;color:#FFAB00;cursor:pointer;' +
    'padding:0 18px;display:flex;align-items:center;}' +
    '.cp-chat-launcher{display:flex;}' +
    '@media (max-width:768px){' +
    '.cp-chat-panel{right:0;left:0;bottom:56px;width:100%;max-width:100%;border-radius:16px 16px 0 0;' +
    'height:70vh;max-height:70vh;}' +
    '}';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function findTopic(id) {
    for (var i = 0; i < CHATBOT_DATA.topics.length; i++) {
      if (CHATBOT_DATA.topics[i].id === id) return CHATBOT_DATA.topics[i];
    }
    return null;
  }

  function matchInput(text) {
    var t = ' ' + text.toLowerCase() + ' ';
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < CHATBOT_DATA.topics.length; i++) {
      var topic = CHATBOT_DATA.topics[i];
      var score = 0;
      for (var k = 0; k < topic.keywords.length; k++) {
        if (t.indexOf(topic.keywords[k]) !== -1) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        best = topic;
      }
    }
    if (best) return { answer: best.answer, suggest: best.suggest };
    for (var s = 0; s < CHATBOT_DATA.smalltalk.length; s++) {
      var st = CHATBOT_DATA.smalltalk[s];
      for (var k2 = 0; k2 < st.keywords.length; k2++) {
        if (t.indexOf(st.keywords[k2]) !== -1) {
          return { answer: st.answer, suggest: CHATBOT_DATA.initialTopics };
        }
      }
    }
    return { answer: CHATBOT_DATA.fallback, suggest: ['services', 'pricing', 'human'] };
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = STYLE_CSS;
    document.head.appendChild(style);

    /* Panel */
    var panel = el('div', 'cp-chat-panel');
    var header = el('div', 'cp-chat-header');
    header.appendChild(el('div', '', '<strong>Client Partners</strong><small>FAQ Assistant</small>'));
    var closeBtn = el('button', 'cp-chat-close', '&times;');
    closeBtn.setAttribute('aria-label', 'Close chat');
    header.appendChild(closeBtn);
    panel.appendChild(header);

    var body = el('div', 'cp-chat-body');
    panel.appendChild(body);

    var inputWrap = el('div', 'cp-chat-input');
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your question...';
    var sendBtn = el('button', '', '<span class="material-icons">send</span>');
    sendBtn.setAttribute('aria-label', 'Send');
    inputWrap.appendChild(input);
    inputWrap.appendChild(sendBtn);
    panel.appendChild(inputWrap);
    document.body.appendChild(panel);

    function scrollBottom() {
      body.scrollTop = body.scrollHeight;
    }

    function botSay(html, suggest) {
      body.appendChild(el('div', 'cp-msg cp-msg-bot', html));
      if (suggest && suggest.length) {
        var quick = el('div', 'cp-quick');
        for (var i = 0; i < suggest.length; i++) {
          (function (topic) {
            if (!topic) return;
            var b = el('button', '', topic.label);
            b.addEventListener('click', function () {
              userSay(topic.label);
              setTimeout(function () {
                botSay(topic.answer, topic.suggest);
              }, 350);
            });
            quick.appendChild(b);
          })(findTopic(suggest[i]));
        }
        body.appendChild(quick);
      }
      scrollBottom();
    }

    function userSay(text) {
      var e = el('div', 'cp-msg cp-msg-user');
      e.textContent = text;
      body.appendChild(e);
      scrollBottom();
    }

    function handleInput() {
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      userSay(text);
      var result = matchInput(text);
      setTimeout(function () {
        botSay(result.answer, result.suggest);
      }, 400);
    }

    sendBtn.addEventListener('click', handleInput);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleInput();
    });

    var greeted = false;
    function openPanel() {
      panel.classList.add('cp-open');
      if (!greeted) {
        greeted = true;
        botSay(CHATBOT_DATA.greeting, CHATBOT_DATA.initialTopics);
      }
    }
    function closePanel() {
      panel.classList.remove('cp-open');
    }
    closeBtn.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });

    /* Launcher: add a CHAT button into the floating CTA bar if present */
    var cta = document.querySelector('.floating-cta');
    var launcher = el('a', 'floating-cta__btn floating-cta__btn--phone cp-chat-launcher',
      '<span class="material-icons">chat</span><span class="floating-cta__label">CHAT</span>');
    launcher.href = 'javascript:void(0)';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('aria-label', 'Open chat assistant');
    launcher.addEventListener('click', function () {
      if (panel.classList.contains('cp-open')) {
        closePanel();
      } else {
        openPanel();
      }
    });
    if (cta) {
      cta.insertBefore(launcher, cta.firstChild);
    } else {
      launcher.style.position = 'fixed';
      launcher.style.bottom = '32px';
      launcher.style.right = '24px';
      launcher.style.zIndex = '900';
      document.body.appendChild(launcher);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
