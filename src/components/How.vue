<template>
  <v-app>
    <section class="welcome-container">
      <div class="title">
        <h1>SafetyPIN 사용방법</h1>
      </div>
    </section>
    <section class="howto-container">
      <div class="steps">
        <div class="step">
          <i class="material-icons">cloud_download</i>
          <div class="caption">
            <h1>다운로드</h1>
            <span>먼저 SafetyPIN 앱을
                        <br>다운로드해주세요</span>
          </div>

        </div>
        <div class="step">
          <i class="material-icons">supervised_user_circle</i>
          <div class="caption">
            <h1>자녀 등록</h1>
            <span>학교에서 받은 자녀 등록코드를
                        <br>앱에 입력해주세요</span>
          </div>
        </div>
        <div class="step">
          <i class="material-icons">send</i>
          <div class="caption">
            <h1>요청 보내기</h1>
            <span>학교에 방문하기전 자녀의
                        <br>선생님에게 방문요청을 보내세요</span>
          </div>
        </div>
      </div>
      <div class="steps">
        <div class="step">
          <i class="material-icons">chat</i>
          <div class="caption">
            <h1>문자 보내기</h1>
            <span>요청을 보낸뒤 자녀의
                        <br>선생님에게 문자를 보내보세요</span>
          </div>
        </div>
        <div class="step">
          <i class="material-icons">fiber_pin</i>
          <div class="caption">
            <h1>PIN 발급받기</h1>
            <span>자녀의 선생님께서 요청을
                        <br>수락하면 PIN이 생성됩니다</span>
          </div>
        </div>
      </div>
    </section>
  </v-app>
</template>

<script>
  export default {
    name: 'How',
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: 'Nanum Gothic', sans-serif;
  }

  .welcome-container {
    width: 100%;
    height: 300px;
    background-color: #2682FF;
    /* background:
    linear-gradient(
        rgba(38, 130, 255, 0.45),
        rgba(38, 130, 255, 0.45)
    ),
    url(background.jpg);
    background-position: center;
    background-attachment: fixed;
    background-size: cover; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title h1 {
    color: white;
    font-size: 2rem;
  }

  .howto-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 960px;
    min-height: 80%;
    margin: 0 auto;
  }

  .steps {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .step {
    width: 250px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step i {
    font-size: 96px;
    color: #2682FF;
  }

  .caption {
    text-align: center;
  }

  .caption h1 {
    margin: 5px;
    font-size: 1.5rem;
  }

  .caption span {
    display: inline-block;
    line-height: 20px;
    margin: 5px;
  }
</style>