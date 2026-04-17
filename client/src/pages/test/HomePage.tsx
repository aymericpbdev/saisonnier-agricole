import Button from '../../components/ui/Button/Button'
import AnnonceCard from '../../components/annonces/AnnonceCard/AnnonceCard'
import AnnonceCardSaison from '../../components/annonces/AnnonceCardSaison/AnnonceCardSaison'
import AnnonceCardAgri from '../../components/annonces/AnnonceCardAgri/AnnonceCardAgri'


function HomePage() {
    return (
      <div>
        <h1>Accueil — Labor</h1>
        <Button variant='outline' size='l'> agriiiiiii</Button>
        <Button variant='secondary' size='s'>saisooooo</Button>
        <Button variant='danger' size='l'>warnig</Button>

        <AnnonceCard typeCulture="vineyard" onClick={() => alert('cliqué !')}>
        <div>
          <h3>Aide vendanges</h3>
          <p>Vigne · Bordeaux, 33</p>
          <p>1 sept → 15 oct</p>
        </div>
      </AnnonceCard>

      <AnnonceCard typeCulture="fruits">
        <div>
          <h3>Cueilleur de pommes</h3>
          <p>Arboriculture · Montauban, 82</p>
          <p>15 juin → 30 août</p>
        </div>
      </AnnonceCard>

      <h2>Vue saisonnier</h2>

      <AnnonceCardSaison
        titre="Cueilleur de pommes"
        typeCulture="fruits"
        ville="Montauban"
        departement="82"
        dateDebut="15 juin"
        dateFin="30 août"
        hebergement={true}
        remuneration="12 €/h"
        postesRestants={2}
        postesTotal={3}
        statut="active"
        onClick={() => alert('Voir annonce')}
      />

      <AnnonceCardSaison
        titre="Aide vendanges"
        typeCulture="vineyard"
        ville="Bordeaux"
        departement="33"
        dateDebut="1 sept"
        dateFin="15 oct"
        hebergement={false}
        remuneration="110 €/jour"
        postesRestants={4}
        postesTotal={6}
        statut="active"
      />

      <AnnonceCardSaison
        titre="Maraîchage été"
        typeCulture="marketGardening"
        ville="Agen"
        departement="47"
        dateDebut="1 juin"
        dateFin="31 août"
        hebergement={true}
        remuneration="11 €/h"
        postesRestants={0}
        postesTotal={5}
        statut="cloturee"
      />

      <h2 style={{ marginTop: '2rem' }}>Vue agriculteur</h2>

      <AnnonceCardAgri
        titre="Cueilleur de pommes"
        typeCulture="fruits"
        dateDebut="15 juin"
        dateFin="30 août"
        postesTotal={3}
        postesPourvus={1}
        statut="active"
        candidaturesTotal={5}
        candidaturesEnAttente={2}
        onClick={() => alert('Voir détail')}
      />

      <AnnonceCardAgri
        titre="Aide vendanges"
        typeCulture="vineyard"
        dateDebut="1 sept"
        dateFin="15 oct"
        postesTotal={6}
        postesPourvus={0}
        statut="brouillon"
        candidaturesTotal={0}
      />

      </div>
    
    )
  }
  
  export default HomePage