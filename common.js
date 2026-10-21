/**
 * ============================================================================
 * ★ クリニック基本設定（電話番号や予約URL、各予約ナビのURLを設定）
 * ============================================================================
 */
const CLINIC_CONFIG = {
  clinicName: "天下茶屋駅前クリニック",
  corpName: "医療法人社団適塾会",
  directorName: "吉田 真也",
  zipCode: "〒557-0041",
  address: "大阪府大阪市西成区岸里1-1-4",
  accessNote: "南海・大阪メトロ「天下茶屋駅」すぐ",

  // ★電話番号
  telDisplay: "06-XXXX-XXXX",
  telLink: "06XXXXXXXX",

  // ★本院の情報
  mainClinicName: "よどがわ内科クリニック",
  mainClinicUrl: "https://yodogawa-cl.com/",
  mainClinicTel: "06-6300-7145",
  mainClinicAddress: "〒532-0023 大阪府大阪市淀川区十三東2丁目9-10 十三駅前医療ビル2階",

  // ★ご指定の各予約URL
  reserveUrl: "#reserve",     
  feverUrl: "#fever-reserve", // 発熱外来URL
  shoshinUrl: "#shoshin",     // 初診URL
  saisinUrl: "#saisin",       // 再診URL
  kenkoUrl: "#kenko-reserve", // 健診URL
  vaccineUrl: "#vaccine-reserve" // ワクチンURL
};

/**
 * 共通ヘッダー・フッター・スマホ固定バー・予約ナビの初期化
 */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderMobileBar();
  initReservationModal(); 
  bindDynamicLinks();
  initHamburgerMenu();
  initLegalTabs();
});

// 現在のファイル名を取得してナビのアクティブ状態を判定
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  return page === "" ? "index.html" : page;
}

// 1. 共通ヘッダーの描画
function renderHeader() {
  const headerPlaceholder = document.getElementById("common-header");
  if (!headerPlaceholder) return;

  const current = getCurrentPage();
  const isActive = (target) => (current === target ? "active" : "");

  headerPlaceholder.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <div class="site-logo">
          <a href="index.html">
            <span class="logo-sub">${CLINIC_CONFIG.corpName}｜南海・天下茶屋駅すぐ</span>
            <span class="logo-main">${CLINIC_CONFIG.clinicName}</span>
          </a>
        </div>

        <button class="hamburger" id="js-hamburger" aria-label="メニューを開く">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="header-nav" id="js-nav">
          <ul class="nav-list">
            <li class="nav-item"><a href="index.html" class="nav-link ${isActive("index.html")}">HOME</a></li>
            <li class="nav-item"><a href="staff.html" class="nav-link ${isActive("staff.html")}">院長・スタッフ紹介</a></li>
            <li class="nav-item">
              <a href="service.html" class="nav-link ${isActive("service.html")}">診療内容 ▾</a>
              <ul class="dropdown-menu">
                <li><a href="service.html#fever">発熱外来</a></li>
                <li><a href="service.html#lifestyle">生活習慣病</a></li>
                <li><a href="service.html#vaccine">予防接種・ワクチン</a></li>
                <li><a href="service.html#respiratory">呼吸器内科</a></li>
                <li><a href="service.html#checkup">健康診断</a></li>
              </ul>
            </li>
            <li class="nav-item"><a href="guide.html" class="nav-link ${isActive("guide.html")}">受診予定の方へ</a></li>
            <li class="nav-item"><a href="access.html" class="nav-link ${isActive("access.html")}">アクセス/診療時間</a></li>
            <li class="nav-item"><a href="about.html" class="nav-link ${isActive("about.html")}">クリニックについて</a></li>
          </ul>
          <div class="header-cta">
            <a href="#" class="btn btn-reserve js-open-reserve-navi">📅 WEB予約はこちら</a>
          </div>
        </nav>
      </div>
    </header>
  `;
}

// 2. 共通フッターの描画
function renderFooter() {
  const footerPlaceholder = document.getElementById("common-footer");
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <p style="font-size:0.85rem; color:#8bbfae;">${CLINIC_CONFIG.corpName}</p>
            <div class="footer-title">${CLINIC_CONFIG.clinicName}</div>
            <p style="font-size:0.9rem; margin-bottom:12px;">
              ${CLINIC_CONFIG.zipCode} ${CLINIC_CONFIG.address}<br>
              （${CLINIC_CONFIG.accessNote}）<br>
              TEL：<a href="tel:${CLINIC_CONFIG.telLink}" style="color:#fff; font-weight:700;">${CLINIC_CONFIG.telDisplay}</a>
            </p>
            <p style="font-size:0.85rem; color:#b8ded3;">
              本院：<a href="${CLINIC_CONFIG.mainClinicUrl}" target="_blank" rel="noopener" style="color:#fff; text-decoration:underline;">${CLINIC_CONFIG.mainClinicName}（大阪市淀川区十三）</a>
            </p>
          </div>

          <div>
            <div style="font-weight:700; color:#fff; margin-bottom:12px;">サイトメニュー</div>
            <ul class="footer-links">
              <li><a href="index.html">HOME</a></li>
              <li><a href="staff.html">院長・スタッフ紹介</a></li>
              <li><a href="service.html">診療内容（発熱外来・内科・呼吸器内科・健診）</a></li>
              <li><a href="guide.html">受診予定の方へ（持ち物・注意事項）</a></li>
              <li><a href="access.html">アクセス・診療時間</a></li>
            </ul>
          </div>

          <div>
            <div style="font-weight:700; color:#fff; margin-bottom:12px;">クリニック情報・法定掲示</div>
            <ul class="footer-links">
              <li><a href="about.html#gallery">院内風景・医療機器紹介</a></li>
              <li><a href="about.html?tab=shisetsu#legal">施設基準・各種加算の掲示</a></li>
              <li><a href="about.html?tab=tokushoho#legal">特定商取引法に基づく表記</a></li>
              <li><a href="about.html?tab=privacy#legal">プライバシーポリシー</a></li>
              <li><a href="about.html?tab=terms#legal">オンライン予約 利用規約</a></li>
              <li><a href="about.html?tab=ai-policy#legal">個人情報利用目的・AIカルテ作成補助</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          &copy; ${new Date().getFullYear()} ${CLINIC_CONFIG.corpName} ${CLINIC_CONFIG.clinicName} All Rights Reserved.
        </div>
      </div>
    </footer>
  `;
}

// 3. スマホ画面下部の固定バー（電話・WEB予約）
function renderMobileBar() {
  const bar = document.createElement("div");
  bar.className = "mobile-fixed-bar";
  bar.innerHTML = `
    <a href="tel:${CLINIC_CONFIG.telLink}" class="mobile-bar-btn mobile-bar-tel">
      <span class="mobile-bar-icon">📞</span>
      <span>電話する</span>
    </a>
    <a href="#" class="mobile-bar-btn mobile-bar-reserve js-open-reserve-navi">
      <span class="mobile-bar-icon">📅</span>
      <span>WEB予約</span>
    </a>
  `;
  document.body.appendChild(bar);
}

// 4. 予約ナビ（スタイリッシュ＆大きめウィンドウのモーダル構築）
function initReservationModal() {
  const modalWrap = document.createElement("div");
  modalWrap.id = "reserve-navi-modal";
  modalWrap.style.cssText = `
    display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(12, 56, 47, 0.65); backdrop-filter: blur(6px); z-index: 2000; justify-content: center; align-items: center; padding: 24px;
  `;

  modalWrap.innerHTML = `
    <div style="background: #ffffff; width: 100%; max-width: 680px; border-radius: 16px; padding: 48px 44px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); position: relative; max-height: 90vh; overflow-y: auto;">
      <button id="navi-close-btn" style="position: absolute; top: 22px; right: 26px; background: none; border: none; font-size: 1.6rem; cursor: pointer; color: #718096; transition: color 0.2s;" onmouseover="this.style.color='#127a62'" onmouseout="this.style.color='#718096'">✕</button>
      
      <div style="margin-bottom: 32px; text-align: center;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #127a62; letter-spacing: 0.2em; text-transform: uppercase;">Reservation Navi</span>
        <h3 style="font-size: 1.6rem; color: #0c5241; margin-top: 6px; font-weight: 800; letter-spacing: 0.03em;">WEB予約ご案内ナビ</h3>
      </div>

      <!-- ナビの各ステップ表示エリア -->
      <div id="navi-step-container"></div>
    </div>
  `;
  document.body.appendChild(modalWrap);

  const closeNavi = () => { modalWrap.style.display = "none"; };
  
  document.getElementById("navi-close-btn").addEventListener("click", closeNavi);
  modalWrap.addEventListener("click", (e) => { if (e.target === modalWrap) closeNavi(); });

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".js-open-reserve-navi");
    if (trigger) {
      e.preventDefault();
      openStep("top");
      modalWrap.style.display = "flex";
    }
  });

  // 予約ナビのステップ制御ロジック
  window.openStep = function(stepId, historyState = null) {
    const container = document.getElementById("navi-step-container");
    let html = "";
    let backStep = historyState;

    switch(stepId) {
      case "top":
        html = `
          <p style="font-weight: 700; color: #2d3748; margin-bottom: 24px; text-align: center; font-size: 1.15rem; letter-spacing: 0.02em;">ご希望の予約項目を選択してください。</p>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="navi-option-btn" onclick="openStep('shisatsu_q1')">診察予約</button>
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.kenkoUrl}'">健康診断予約</button>
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.vaccineUrl}'">ワクチン接種予約</button>
          </div>
        `;
        break;

      case "shisatsu_q1":
        html = `
          <div style="margin-bottom: 24px; text-align: center;">
            <p style="font-size: 1.1rem; font-weight: 700; color: #2d3748; line-height: 1.7; margin-bottom: 8px;">3日以内に37.5℃を超える発熱がありますか？</p>
            <p style="font-size: 1.1rem; font-weight: 700; color: #2d3748; line-height: 1.7;">またはインフルエンザ・コロナの抗原検査を希望しますか？</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="navi-option-btn primary" onclick="location.href='${CLINIC_CONFIG.feverUrl}'">はい（発熱外来 or 抗原検査）</button>
            <button class="navi-option-btn" onclick="openStep('shisatsu_hatsunetsu_no', 'top')">いいえ</button>
          </div>
        `;
        backStep = "top";
        break;

      case "shisatsu_hatsunetsu_no":
        html = `
          <p style="font-weight: 700; color: #2d3748; margin-bottom: 24px; text-align: center; font-size: 1.15rem;">当院へ初めて受診されますか？</p>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.shoshinUrl}'">初めて受診します（初診）</button>
            <button class="navi-option-btn" onclick="openStep('shisatsu_riin_check', 'shisatsu_q1')">来院したことがある</button>
          </div>
        `;
        backStep = "shisatsu_q1";
        break;

      case "shisatsu_riin_check":
        html = `
          <p style="font-weight: 700; color: #2d3748; margin-bottom: 24px; text-align: center; font-size: 1.15rem;">現在の通院状況についてお選びください。</p>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.saisinUrl}'">はい（定期通院中）</button>
            <button class="navi-option-btn" onclick="openStep('shisatsu_month_check', 'shisatsu_hatsunetsu_no')">いいえ（定期通院ではない）</button>
          </div>
        `;
        backStep = "shisatsu_hatsunetsu_no";
        break;

      case "shisatsu_month_check":
        html = `
          <p style="font-weight: 700; color: #2d3748; margin-bottom: 24px; text-align: center; font-size: 1.15rem;">前回の来院から1ヶ月以上空いていますか？</p>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.shoshinUrl}'">はい（1ヶ月以上空いている）</button>
            <button class="navi-option-btn" onclick="location.href='${CLINIC_CONFIG.saisinUrl}'">いいえ（1ヶ月以内である）</button>
          </div>
        `;
        backStep = "shisatsu_riin_check";
        break;
    }

    // 戻るボタンの付加
    if (backStep) {
      html += `
        <div style="margin-top: 36px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <button onclick="openStep('${backStep}')" style="background: none; border: none; color: #127a62; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">‹ 戻る</button>
          <button onclick="openStep('top')" style="background: none; border: none; color: #718096; font-size: 0.92rem; cursor: pointer;">最初からやり直す</button>
        </div>
      `;
    }

    container.innerHTML = html;
  };
}

// 5. ページ内の動的プレースホルダーを自動置換
function bindDynamicLinks() {
  document.querySelectorAll(".js-tel-link").forEach((el) => {
    el.setAttribute("href", `tel:${CLINIC_CONFIG.telLink}`);
  });
  document.querySelectorAll(".js-tel-text").forEach((el) => {
    el.textContent = CLINIC_CONFIG.telDisplay;
  });
}

// 6. スマホ用ハンバーガーメニュー開閉
function initHamburgerMenu() {
  const btn = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("is-active");
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      btn.classList.remove("is-active");
      nav.classList.remove("is-open");
    });
  });
}

// 7. 法定掲示タブの切り替え＆URLパラメータ連動
function initLegalTabs() {
  const tabBtns = document.querySelectorAll(".legal-tab-btn");
  const tabPanels = document.querySelectorAll(".legal-tab-panel");
  if (tabBtns.length === 0) return;

  const activateTab = (tabId) => {
    tabBtns.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabId);
    });
    tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === `panel-${tabId}`);
    });
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.tab);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const targetTab = params.get("tab");
  if (targetTab) {
    activateTab(targetTab);
  }
}