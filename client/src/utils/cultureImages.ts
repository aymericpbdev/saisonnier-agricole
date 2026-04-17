import cereals from '../assets/cultures/Cereals.jpg'
import fieldCrops from '../assets/cultures/FieldCrops.jpg'
import fruits from '../assets/cultures/Fruits.jpg'
import horticulture from '../assets/cultures/Horticulture.jpg'
import livestock from '../assets/cultures/Livestock.jpg'
import marketGardening from '../assets/cultures/MarketGardening.jpg'
import oliveTrees from '../assets/cultures/OliveTrees.jpg'
import vegetables from '../assets/cultures/Vegetables.jpg'
import vineyard from '../assets/cultures/Vineyard.jpg'
import defaultImg from '../assets/cultures/Default.jpg'

import type { CropType } from '../types'

// MAPPING
// Les clés correspondent aux valeurs de l'enum CropType (avec préfixe Crop_)
const CULTURE_IMAGES: Record<CropType, string> = {
  Crop_Cereals: cereals,
  Crop_FieldCrops: fieldCrops,
  Crop_Fruits: fruits,
  Crop_Horticulture: horticulture,
  Crop_Livestock: livestock,
  Crop_MarketGardening: marketGardening,
  Crop_OliveTrees: oliveTrees,
  Crop_Vegetables: vegetables,
  Crop_Vineyard: vineyard,
}

// FONCTION PUBLIQUE 
/*
Retourne l'image associée à un CropType.
Si le type est inconnu ou absent, retourne le logo Labor.
 */
export function getImageForCulture(type?: CropType | string | null): string {
  if (!type) return defaultImg
  return CULTURE_IMAGES[type as CropType] ?? defaultImg
}