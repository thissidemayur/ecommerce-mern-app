 
import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="men"
      category = "ACTIVE-WEAR"
      // subCategory="JEANS"
      title="Men's ACTIVE-WEAR"
      discountText="Save 15% on any MEN's ACTIVE-WEAR with Code 'BEING-MEN'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}
