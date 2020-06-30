<template>
  <div class="content">
    <h1>GDPR POLICY</h1>
    Vi värnar om dina data
    <h2>Hantering av persondata – Vad, hur och varför</h2>
    Våra medlemmars privatliv är viktigt och därför följer vi alltid riktlinjerna som finns i PUL.
    <br><br>
    I och med introduktionen av GDPR den 25:e maj 2018 kom även krav på att vi ska dokumentera vad vi hanterar för information samt hur den hanteras och varför. Här är vår beskrivning av hur vi hanterar användardata idag. Är det något du saknar eller som behöver förtydligas så får du gärna hojta till och lämna feedback <router-link to="/contact">här</router-link>.
    <h2>Insamling av data</h2>
    Vår datahantering baserar sig på "Avtal med den registrerade" som grund för laglig behandling. Dock är största delen av informationen vi hanterar, information som medlemmarna frivilligt matar in.
    <br><br>
    Data vi samlar in om användarna är information som användare själva matar in i registreringsformulär. Vi sparar även IP-adresser för att kunna spåra hackningsförsök och andra oegentligheter. Personlig information används för att vi ska kunna tillhandahålla tjänsten till användaren, så som tjänsten är ämnad att användas.
    <h2>Förvaring av data</h2>
    <ul>
      <li>Data förvaras i en databas som befinner sig på två speglade RAID diskar.</li>
      <li>Data förvaras även på en backupserver där en kopia sparas i 10 dagar innan den raderas.</li>
      <li>Servern är skyddad med SSL.</li>
      <li>Lösenord är krypterade med algoritmen bCrypt men är även hashade med både salt och peppar för extra säkerhet.</li>
      <li>Mjukvaran som systemet drivs med uppdateras regelbundet (minst 1 gång i kvartalet) samt vid rapport om brister i mjukvara för att säkerställa att informationen är skyddad på bästa sätt</li>
    </ul>
    <h2>Rensning av data</h2>
    <ul>
      <li>När en användare avslutar sitt konto raderas all personlig information i profilen.</li>
      <li>Vi har aktiverat automatisk utrensning av gamla inaktiva konton. Konton som varit inaktiva i 3 år kommer automatiskt raderas från systemet 30 dagar efter att en sista påminnelse skickats ut till medlemmen. En gång per år skickar vi även ut ett mail till alla inaktiva användare och frågar om de fortfarande vill ha sitt konto kvar. De kan då själva gå in och ta bort sitt konto om de så önskar.</li>
    </ul>
    <h2>Vad vi klassar som persondata i våra system</h2>
    <ul>
      <li>Användarnamn, förnamn, efternamn, lösenord, telefonnummer, mail, IP-adress och profilbild. (Lösenordet är krypterat och finns inte tillgängligt i klartext någon stans i systemet)</li>
      <li>Systemloggen sparas i 60 dagar, här kan personlig information förekomma. Den kan vi ta bort i förtid vid specifik begäran.</li>
      <li>Sessionsloggen håller reda på din inloggning om du valt att stänga ner sida utan att logga ut. Väljer du att aktivt logga ut raderas sessionen efter 30 dagar. Om du inte loggar ut raderas sessionen automatiskt efter 6 månader.</li>
      <li>Apacheloggen (på servern) innehåller IP-adresser och sparas i ca 10 dagar.</li>
      <li>Mailloggen (på servern) sparar mailadresser i ca 10 dagar.</li>
      <li>I mailutskicksloggen (i databasen) sparas mail i ca 20 dagar. Utifall ett fel skulle uppstå som gör att vi måste återsända mail.</li>
      <li>Enligt GDPR innefattas även ostrukturerade data i lagstiftningen. Det gäller information som finns i eventtexter, kommentarer, bilder mm på sidan men även mail som har skickats till Sporty.se. (Kommentarer som har skickats i mail till andra användare har vi ingen möjlighet att radera.)</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PrivacyView'
}
</script>

<style scoped>
.content {
  text-align: left;
  padding-left: 20px;
}
a {
  color: purple;
  text-decoration: underline;
}
</style>