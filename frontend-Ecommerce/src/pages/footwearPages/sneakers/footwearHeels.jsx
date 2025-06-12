     
 import ProductListingPage from '../../ProductListPage';
 import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';
 
 export default function MenPants() {
   return (
     <ProductListingPage
       gender="women"
    //    Category="FOOTWEAR"
       subCategory="HEELS"
       title="HELLS"
       discountText="Save 15% on any BALLET with Code 'BEING-WEAR'"
       apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
       apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
     />
   );
 }
 
 
 
 