import Button from '../../components/ui/Button/Button'
import AnnonceCard from '../../components/annonces/AnnonceCard/AnnonceCard'
import AnnonceCardSaison from '../../components/annonces/AnnonceCardSaison/AnnonceCardSaison'
import AnnonceCardAgri from '../../components/annonces/AnnonceCardAgri/AnnonceCardAgri'
import Badge from '../../components/ui/Badge/Badge'



function HomePage() {
    return (
      <div>
        <h1>Accueil — Labor</h1>
        <Button variant='outline' size='l'> agriiiiiii</Button>
        <Button variant='secondary' size='s'>saisooooo</Button>
        <Button variant='danger' size='l'>warnig</Button>

        <AnnonceCard typeCulture='Crop_Cereals' onClick={() => alert('cliqué !')}>
        <div>
          <h3>Aide vendanges</h3>
          <p>Vigne · Bordeaux, 33</p>
          <p>1 sept → 15 oct</p>
        </div>
      </AnnonceCard>

      <AnnonceCard typeCulture=" ">
        <div>
          <h3>Cueilleur de pommes</h3>
          <p>Arboriculture · Montauban, 82</p>
          <p>15 juin → 30 août</p>
        </div>
      </AnnonceCard>

      <h2>Vue saisonnier</h2>
      <AnnonceCardSaison
        titre="Cueilleur de pommes"
        cropType="Crop_Fruits"
        ville="Montauban"
        departement="82"
        dateDebut="15 juin"
        dateFin="30 août"
        hebergement={true}
        payAmount={12}
        paymentType="Hourly"
        postesRestants={2}
        postesTotal={3}
        statut="Active"
        onClick={() => alert('Voir annonce')}
      />

      <AnnonceCardSaison
        titre="Aide vendanges"
        cropType="Crop_Vineyard"
        ville="Bordeaux"
        departement="33"
        dateDebut="1 sept"
        dateFin="15 oct"
        hebergement={false}
        payAmount={110}
        paymentType="Weekly"
        postesRestants={4}
        postesTotal={6}
        statut="Active"
      />

      <h2 style={{ marginTop: '2rem' }}>Vue agriculteur</h2>

      <AnnonceCardAgri
        titre="Cueilleur de pommes"
        cropType="Crop_Fruits"
        dateDebut="15 juin"
        dateFin="30 août"
        postesTotal={3}
        postesPourvus={1}
        statut="Active"
        candidaturesTotal={5}
        candidaturesEnAttente={2}
      />


      <Badge variant='Pending' size='l'  ></Badge>
      <Badge variant='Accepted' size='m'  ></Badge>
      <Badge variant='Rejected' size='s'  ></Badge>
      <Badge variant='Active' size='l'  ></Badge>
      <Badge variant='Draft' size='m'  ></Badge>
      <Badge variant='Closed' size='s'  ></Badge>



      </div>
    
    )
  }
  
  export default HomePage