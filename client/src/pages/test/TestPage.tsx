import { useState } from 'react'

import Button from '../../components/ui/Button/Button'
import AnnonceCard from '../../components/annonces/AnnonceCard/AnnonceCard'
import AnnonceCardSaison from '../../components/annonces/AnnonceCardSaison/AnnonceCardSaison'
import AnnonceCardAgri from '../../components/annonces/AnnonceCardAgri/AnnonceCardAgri'
import Badge from '../../components/ui/Badge/Badge'
import Tag from '../../components/ui/Tag/Tag'
import type { Skill } from '../../types'
import { Skill as SkillEnum } from '../../types'
import AlertBanner from '../../components/ui/AlertBanner/AlertBanner'
import LinkText from '../../components/ui/LinkText/LinkText'
import { LaborInput } from '../../components/ui/Input/input'
import  LaborTextarea  from '../../components/ui/Textarea/textarea'





function TestPage() {

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([
    SkillEnum.MarketGardening,
    SkillEnum.Planting,
  ])

  const [textareaValue, setTextareaValue] = useState('')

  // Toggle une skill dans la liste
  function handleToggle(skill: Skill) {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const allSkills = Object.values(SkillEnum)

    return (
      <div>
        <h1>Accueil — Labor</h1>
        <Button variant='outline' size='l'> agriiiiiii</Button>
        <Button variant='secondary' size='s'>saisooooo</Button>
        <Button variant='danger' size='l'>warnig</Button>
        <Button variant='primary' size='m'>Connexion</Button>

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


      <h2>Mes compétences</h2>

        {/* Sélection profil saisonnier */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
          {allSkills.map(skill => (
            <Tag
              key={skill}
              value={skill}
              selected={selectedSkills.includes(skill)}
              onClick={handleToggle}
            />
          ))}
        </div>
        
        <h2 style={{ marginTop: '2rem' }}>Détail annonce (display-only)</h2>
        
        {/* Affichage détail annonce */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
          <Tag value={SkillEnum.Harvesting} displayOnly />
          <Tag value={SkillEnum.Viticulture} displayOnly />
          <Tag value={SkillEnum.MachineOperation} displayOnly />
        </div>

   
        <AlertBanner variant="warning" title="Profil incomplet">
          Champs manquants : localisation, téléphone
        </AlertBanner>
      


        <AlertBanner variant="error" title="Erreur de connexion">
          Identifiants incorrects. Vérifiez votre email et mot de passe.
        </AlertBanner>
      

      <AlertBanner variant="success">
        Vos modifications ont été enregistrées.
      </AlertBanner>


    
      <h1>LinkText</h1>
      <div style={{display: 'flex', justifyContent: 'center', flex: 'wrap', gap: '40px', marginBottom: '60px'  }}>
        
        <LinkText to="/annonces">← Retour aux annonces</LinkText>
        <p>
          Pas encore de compte ? <LinkText to="/inscription">S'inscrire</LinkText>
        </p>
        <LinkText to="/mot-de-passe-oublie">Mot de passe oublié ?</LinkText>
        <LinkText to="https://example.com" external>Conditions générales</LinkText>
      </div>

      <div style={{ marginLeft: '50px' }}>
      <h1>Input</h1>
      <LaborInput id='nom' label='Nom' type='text'/>
      <LaborInput id="email" label="Email" type="email" placeholder="jean@email.com"/>
      </div>

      <div style={{ marginLeft: '50px' }}>
      <h1>Textarea</h1>
      <LaborTextarea
        id="description"
        label="Description"
        placeholder="Décris ta mission…"
        value={textareaValue}
        onChange={setTextareaValue}
        minLength={10}
        maxLength={300}
      />
      <LaborTextarea
        id="textarea-error"
        label="Avec erreur"
        placeholder="Champ en erreur…"
        value=""
        onChange={() => {}}
        error="Ce champ est requis."
      />
      <LaborTextarea
        id="textarea-disabled"
        label="Désactivé"
        value="Champ désactivé"
        onChange={() => {}}
        disabled
      />
      </div>

      
      

      </div>
    
    )
  }
  
  export default TestPage