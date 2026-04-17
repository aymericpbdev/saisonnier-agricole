// IMPORTS DES IMAGES 
import cereals from '../assets/cultures/Cereals.jpg'
import fieldCrops from '../assets/cultures/FieldCrops.jpg'
import fruits from '../assets/cultures/Fruits.jpg'
import horticulture from '../assets/cultures/Horticulture.jpg'
import livestock from '../assets/cultures/Livestock.jpg'
import marketGardening from '../assets/cultures/MarketGardening.jpg'
import oliveTrees from '../assets/cultures/OliveTrees.jpg'
import vegetables from '../assets/cultures/Vegetables.jpg'
import vineyard from '../assets/cultures/Vineyard.jpg'
import logoDefault from '../assets/cultures/Default.jpg' // ou le chemin réel de ton logo

//TYPES
export type TypeCulture =
  | 'cereals'
  | 'fieldCrops'
  | 'fruits'
  | 'horticulture'
  | 'livestock'
  | 'marketGardening'
  | 'oliveTrees'
  | 'vegetables'
  | 'vineyard'

// MAPPING
const CULTURE_IMAGES: Record<TypeCulture, string> = {
  cereals,
  fieldCrops,
  fruits,
  horticulture,
  livestock,
  marketGardening,
  oliveTrees,
  vegetables,
  vineyard,
}

// FONCTION PUBLIQUE 
/*  Retourne l'image associée à un type de culture.
    Si le type est inconnu ou absent, retourne le logo Labor.*/
export function getImageForCulture(type?: TypeCulture | string | null): string {
  if (!type) return logoDefault
  return CULTURE_IMAGES[type as TypeCulture] ?? logoDefault
}