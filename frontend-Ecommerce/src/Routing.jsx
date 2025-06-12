import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// Component
const Loader = lazy(() => import('./component/Loader.jsx'));

// Parent Pages (User)
const CartOrder = lazy(() => import('./pages/Cart.jsx'));
const CheckOutOrder = lazy(() => import('./pages/CheckOut.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const SignUp = lazy(() => import('./pages/Signup.jsx'));
const SignIn = lazy(() => import('./pages/Signin.jsx'));
const Navbar = lazy(() => import('./component/NavBar.jsx'));
const Footer = lazy(() => import('./component/Footer.jsx'));
const MenProductCategories = lazy(() => import('./pages/MenProductCategories.jsx'));
const WomenProductCategories = lazy(() => import('./pages/WomenProductCategories.jsx'));
const ProductCreate = lazy(() => import('./pages/ProductCreate.jsx'));
const ProductUpdate = lazy(() => import('./pages/ProductUpdate.jsx'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation.jsx'));
const UserAccount = lazy(() => import('./pages/UserAccount.jsx'));
const Profile = lazy(() => import('./component/User-viewProfile.jsx'));
const UpdateProfile = lazy(() => import('./component/User-updateProfile.jsx'));
const UpdatePassword = lazy(() => import('./component/User-updatePassword.jsx'));
const DeleteAccount = lazy(() => import('./component/User-deleteAccount.jsx'));



// ------------------ MEN SUBPAGE ------------------

// Men Bottomwear
const MenBottomwear = lazy(() => import('./pages/menPages/bottomwear/MenBottomwear.jsx'));
const MenCargo = lazy(() => import('./pages/menPages/bottomwear/menCargo.jsx'));
const MenChinos = lazy(() => import('./pages/menPages/bottomwear/menChinnos.jsx'));
const MenJeans = lazy(() => import('./pages/menPages/bottomwear/menJeans.jsx'));
const MenJoggers = lazy(() => import('./pages/menPages/bottomwear/menJoggers.jsx'));
const MenTrouser = lazy(() => import('./pages/menPages/bottomwear/menTrouser.jsx'));
const MenShorts = lazy(() => import('./pages/menPages/bottomwear/menShorts.jsx'));
const MenSweatpants = lazy(() => import('./pages/menPages/bottomwear/MenBottomwear.jsx'));

// Men Tops
const MenBlazers = lazy(() => import('./pages/menPages/tops/menBlazzer.jsx'));
const MenHoodies = lazy(() => import('./pages/menPages/tops/menHoddies.jsx'));
const MenJackets = lazy(() => import('./pages/menPages/tops/menJackets.jsx'));
const MenPoloShirts = lazy(() => import('./pages/menPages/tops/menPoloShirt.jsx'));
const MenShirts = lazy(() => import('./pages/menPages/tops/menShirt.jsx'));
const MenSweatshirt = lazy(() => import('./pages/menPages/tops/menSweatShirt.jsx'));
const MenTankTop = lazy(() => import('./pages/menPages/tops/menTanktop.jsx'));
const MenTop = lazy(() => import('./pages/menPages/tops/menTop.jsx'));
const MenTshirt = lazy(() => import('./pages/menPages/tops/menTshirt.jsx'));

// Men Dresses & Jumpsuits
// const MenDressesJumpsuits = lazy(() => import('./pages/menPages/dresses-jumpsuits/MenDressesJumpsuits.jsx'));

// Men Outerwear
const MenOuterwear = lazy(() => import('./pages/menPages/outerwear/MenOuterwear.jsx'));
const MenCoats = lazy(() => import('./pages/menPages/outerwear/menCoats.jsx'));
const MenBomberJackets = lazy(() => import('./pages/menPages/outerwear/menBomberJackets.jsx'));
const MenParkas = lazy(() => import('./pages/menPages/outerwear/menParkas.jsx'));

// Men Activewear
const MenActivewear = lazy(() => import('./pages/menPages/activewear/MenActivewear.jsx'));
const MenTrackpants = lazy(() => import('./pages/menPages/activewear/menTrackpants.jsx'));
const MenGymShorts = lazy(() => import('./pages/menPages/activewear/menGymShorts.jsx'));
const MenWorkoutTshirts = lazy(() => import('./pages/menPages/activewear/menWorkoutTshirts.jsx'));
const MenSportsJackets = lazy(() => import('./pages/menPages/activewear/menSportsJackets.jsx'));
const MenCompressionWear = lazy(() => import('./pages/menPages/activewear/menCompressionWear.jsx'));
const MenRunningShoes = lazy(() => import('./pages/menPages/activewear/menRunningShoes.jsx'));

// Men Suits & Blazers
const MenSuitsBlazers = lazy(() => import('./pages/menPages/suits-blazers/MenSuitsBlazers.jsx'));
const MenSuits = lazy(() => import('./pages/menPages/suits-blazers/menSuits.jsx'));
const MenWaistcoats = lazy(() => import('./pages/menPages/suits-blazers/menWaistcoats.jsx'));
const MenTuxedos = lazy(() => import('./pages/menPages/suits-blazers/menTuxedos.jsx'));

// ------------------ WOMEN SUBPAGE ------------------

// Women Tops
const WomenTops = lazy(() => import('./pages/womenPages/tops/WomenTops.jsx'));
const WomenTshirts = lazy(() => import('./pages/womenPages/tops/womenTshirts.jsx'));
const WomenBlouses = lazy(() => import('./pages/womenPages/tops/womenBlouses.jsx'));
const WomenSweaters = lazy(() => import('./pages/womenPages/tops/womenSweaters.jsx'));
const WomenSweatshirts = lazy(() => import('./pages/womenPages/tops/womenSweatshirts.jsx'));
const WomenHoodies = lazy(() => import('./pages/womenPages/tops/womenHoodies.jsx'));
const WomenTankTops = lazy(() => import('./pages/womenPages/tops/womenTankTops.jsx'));
const WomenCardigans = lazy(() => import('./pages/womenPages/tops/womenCardigans.jsx'));
const WomenPoloShirts = lazy(() => import('./pages/womenPages/tops/womenPoloShirts.jsx'));
const WomenPeplumTops = lazy(() => import('./pages/womenPages/tops/womenPeplumTops.jsx'));
const WomenCroppedTops = lazy(() => import('./pages/womenPages/tops/womenCroppedTops.jsx'));

// Women Bottomwear
const WomenBottomwear = lazy(() => import('./pages/womenPages/bottomwear/WomenBottomwear.jsx'));
const WomenJeans = lazy(() => import('./pages/womenPages/bottomwear/womenJeans.jsx'));
const WomenTrousers = lazy(() => import('./pages/womenPages/bottomwear/womenTrousers.jsx'));
const WomenLeggings = lazy(() => import('./pages/womenPages/bottomwear/womenLeggings.jsx'));
const WomenChinos = lazy(() => import('./pages/womenPages/bottomwear/womenChinos.jsx'));
const WomenCulottes = lazy(() => import('./pages/womenPages/bottomwear/womenCulottes.jsx'));
const WomenShorts = lazy(() => import('./pages/womenPages/bottomwear/womenShorts.jsx'));
const WomenJoggers = lazy(() => import('./pages/womenPages/bottomwear/womenJoggers.jsx'));
const WomenSweatpants = lazy(() => import('./pages/womenPages/bottomwear/womenSweatpants.jsx'));
const WomenSkirts = lazy(() => import('./pages/womenPages/bottomwear/womenSkirts.jsx'));
const WomenPalazzoPants = lazy(() => import('./pages/womenPages/bottomwear/womenPalazzoPants.jsx'));
const WomenMidiSkirts = lazy(() => import('./pages/womenPages/bottomwear/womenMidiSkirts.jsx'));

// Women Dresses & Jumpsuits
const WomenDressesJumpsuits = lazy(() => import('./pages/womenPages/dresses-jumpsuits/WomenDressesJumpsuits.jsx'));
const WomenMaxiDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenMaxiDresses.jsx'));
const WomenMidiDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenMidiDresses.jsx'));
const WomenMiniDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenMiniDresses.jsx'));
const WomenCocktailDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenCocktailDresses.jsx'));
const WomenCasualDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenCasualDresses.jsx'));
const WomenBodyconDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenBodyconDresses.jsx'));
const WomenTunicDresses = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenTunicDresses.jsx'));
const WomenJumpsuits = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenJumpsuits.jsx'));
const WomenRompers = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenRompers.jsx'));
const WomenPlaysuits = lazy(() => import('./pages/womenPages/dresses-jumpsuits/womenPlaysuits.jsx'));

// Women Outerwear
const WomenOuterwear = lazy(() => import('./pages/womenPages/outerwear/WomenOuterwear.jsx'));
const WomenJackets = lazy(() => import('./pages/womenPages/outerwear/womenJackets.jsx'));
const WomenCoats = lazy(() => import('./pages/womenPages/outerwear/womenCoats.jsx'));
const WomenBlazers = lazy(() => import('./pages/womenPages/outerwear/womenBlazers.jsx'));
const WomenBomberJackets = lazy(() => import('./pages/womenPages/outerwear/womenBomberJackets.jsx'));
const WomenTrenchCoats = lazy(() => import('./pages/womenPages/outerwear/womenTrenchCoats.jsx'));
const WomenPufferJackets = lazy(() => import('./pages/womenPages/outerwear/womenPufferJackets.jsx'));
const WomenParkas = lazy(() => import('./pages/womenPages/outerwear/womenParkas.jsx'));
const WomenPeacoats = lazy(() => import('./pages/womenPages/outerwear/womenPeacoats.jsx'));
const WomenDenimJackets = lazy(() => import('./pages/womenPages/outerwear/womenDenimJackets.jsx'));

// Women Activewear
const WomenActivewear = lazy(() => import('./pages/womenPages/activewear/WomenActivewear.jsx'));
const WomenSportsBras = lazy(() => import('./pages/womenPages/activewear/womenSportsBras.jsx'));
const WomenGymTshirts = lazy(() => import('./pages/womenPages/activewear/womenGymTshirts.jsx'));
const WomenTrackpants = lazy(() => import('./pages/womenPages/activewear/womenTrackpants.jsx'));
const WomenYogaPants = lazy(() => import('./pages/womenPages/activewear/womenYogaPants.jsx'));
const WomenRunningShoes = lazy(() => import('./pages/womenPages/activewear/womenRunningShoes.jsx'));
const WomenSportsJackets = lazy(() => import('./pages/womenPages/activewear/womenSportsJackets.jsx'));
const WomenActiveShorts = lazy(() => import('./pages/womenPages/activewear/womenActiveShorts.jsx'));
const WomenCompressionWear = lazy(() => import('./pages/womenPages/activewear/womenCompressionWear.jsx'));
const WomenAthleticHoodies = lazy(() => import('./pages/womenPages/activewear/womenAthleticHoodies.jsx'));

// Women Footwear
const WomenFootwear = lazy(() => import('./pages/womenPages/footwear/WomenFootwear.jsx'));
const WomenSneakers = lazy(() => import('./pages/womenPages/footwear/womenSneakers.jsx'));
const WomenFlats = lazy(() => import('./pages/womenPages/footwear/womenFlats.jsx'));
const WomenHeels = lazy(() => import('./pages/womenPages/footwear/womenHeels.jsx'));
const WomenBoots = lazy(() => import('./pages/womenPages/footwear/womenBoots.jsx'));
const WomenSandals = lazy(() => import('./pages/womenPages/footwear/womenSandals.jsx'));
const WomenWedges = lazy(() => import('./pages/womenPages/footwear/womenWedges.jsx'));
const WomenLoafers = lazy(() => import('./pages/womenPages/footwear/womenLoafers.jsx'));
const WomenFlipFlops = lazy(() => import('./pages/womenPages/footwear/womenFlipFlops.jsx'));
const WomenBalletFlats = lazy(() => import('./pages/womenPages/footwear/womenBalletFlats.jsx'));
const WomenSlides = lazy(() => import('./pages/womenPages/footwear/womenSlides.jsx'));

// Women Lingerie & Sleepwear
const WomenLingerieSleepwear = lazy(() => import('./pages/womenPages/lingerie-sleepwear/WomenLingerieSleepwear.jsx'));
const WomenBras = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenBras.jsx'));
const WomenPanties = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenPanties.jsx'));
const WomenShapewear = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenShapewear.jsx'));
const WomenSleepwear = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenSleepwear.jsx'));
const WomenNightgowns = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenNightgowns.jsx'));
const WomenPajamaSets = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenPajamaSets.jsx'));
const WomenLingerieSets = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenLingerieSets.jsx'));
const WomenRobes = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenRobes.jsx'));
const WomenBodysuits = lazy(() => import('./pages/womenPages/lingerie-sleepwear/womenBodysuits.jsx'));

// Women Swimwear
const WomenSwimwear = lazy(() => import('./pages/womenPages/swimwear/WomenSwimwear.jsx'));
const WomenBikinis = lazy(() => import('./pages/womenPages/swimwear/womenBikinis.jsx'));
const WomenOnePieceSwimsuits = lazy(() => import('./pages/womenPages/swimwear/womenOnePieceSwimsuits.jsx'));
const WomenTankinis = lazy(() => import('./pages/womenPages/swimwear/womenTankinis.jsx'));
const WomenSwimDresses = lazy(() => import('./pages/womenPages/swimwear/womenSwimDresses.jsx'));
const WomenCoverUps = lazy(() => import('./pages/womenPages/swimwear/womenCoverUps.jsx'));
const WomenSwimShorts = lazy(() => import('./pages/womenPages/swimwear/womenSwimShorts.jsx'));

// ------------------ ACCESSORIES SUBPAGE ------------------

// Accessories Handbags
const AccessoriesHandbags = lazy(() => import('./pages/accessoriesPages/handbags/AccessoriesHandbags.jsx'));
const AccessoriesToteBags = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesToteBags.jsx'));
const AccessoriesClutches = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesClutches.jsx'));
const AccessoriesBackpacks = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesBackpacks.jsx'));
const AccessoriesCrossbodyBags = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesCrossbodyBags.jsx'));
const AccessoriesWallets = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesWallets.jsx'));
const AccessoriesSunglasses = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesSunglasses.jsx'));
const AccessoriesHats = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesHats.jsx'));
const AccessoriesScarves = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesScarves.jsx'));
const AccessoriesBelts = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesBelts.jsx'));
const AccessoriesWatches = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesWatches.jsx'));
const AccessoriesJewelry = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesJewelry.jsx'));
const AccessoriesHairAccessories = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesHairAccessories.jsx'));
const AccessoriesTights = lazy(() => import('./pages/accessoriesPages/handbags/accessoriesTights.jsx'));

// ------------------ FOOTWEAR SUBPAGE ------------------

// Footwear Sneakers
const FootwearSneakers = lazy(() => import('./pages/footwearPages/sneakers/FootwearSneakers.jsx'));
const FootwearFlats = lazy(() => import('./pages/footwearPages/sneakers/footwearFlats.jsx'));
const FootwearHeels = lazy(() => import('./pages/footwearPages/sneakers/footwearHeels.jsx'));
const FootwearBoots = lazy(() => import('./pages/footwearPages/sneakers/footwearBoots.jsx'));
const FootwearSandals = lazy(() => import('./pages/footwearPages/sneakers/footwearSandals.jsx'));
const FootwearWedges = lazy(() => import('./pages/footwearPages/sneakers/footwearWedges.jsx'));
const FootwearLoafers = lazy(() => import('./pages/footwearPages/sneakers/footwearLoafers.jsx'));
const FootwearFlipFlops = lazy(() => import('./pages/footwearPages/sneakers/footwearFlipFlops.jsx'));
const FootwearBalletFlats = lazy(() => import('./pages/footwearPages/sneakers/footwearBalletFlats.jsx'));
const FootwearSlides = lazy(() => import('./pages/footwearPages/sneakers/footwearSlides.jsx'));

function Routing() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<CheckOutOrder />} />
          <Route path="/cart" element={<CartOrder />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/addProduct" element={<ProductCreate />} />
          <Route path="/updateProduct" element={<ProductUpdate />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/delete-account" element={<DeleteAccount />} />

          {/* Men Routes */}
          <Route path="/categories/men">
            <Route index element={<MenProductCategories />} />

            {/* Men Bottomwear */}
            <Route path="bottomwear" element={<MenBottomwear />} />
            <Route path="cargo-pants" element={<MenCargo />} />
            <Route path="chinos" element={<MenChinos />} />
            <Route path="joggers" element={<MenJoggers />} />
            <Route path="jeans" element={<MenJeans />} />
            <Route path="shorts" element={<MenShorts />} />
            <Route path="trousers" element={<MenTrouser />} />
            <Route path="sweatpants" element={<MenSweatpants />} />

            {/* Men Bottomwear Dynamic Routing */}
            <Route path="bottomwear/:productId" element={<ProductDetail />} />
            <Route path="cargo-pants/:productId" element={<ProductDetail />} />
            <Route path="chinos/:productId" element={<ProductDetail />} />
            <Route path="joggers/:productId" element={<ProductDetail />} />
            <Route path="jeans/:productId" element={<ProductDetail />} />
            <Route path="shorts/:productId" element={<ProductDetail />} />
            <Route path="trousers/:productId" element={<ProductDetail />} />
            <Route path="sweatpants/:productId" element={<ProductDetail />} />

            {/* Men Tops */}
            <Route path="tops" element={<MenTop />} />
            <Route path="t-shirts" element={<MenTshirt />} />
            <Route path="shirts" element={<MenShirts />} />
            <Route path="sweatshirts" element={<MenSweatshirt />} />
            <Route path="hoodies" element={<MenHoodies />} />
            <Route path="polo-shirts" element={<MenPoloShirts />} />
            <Route path="tank-tops" element={<MenTankTop />} />
            <Route path="jackets" element={<MenJackets />} />
            <Route path="blazers" element={<MenBlazers />} />

            {/* Men Tops Dynamic Routing */}
            <Route path="tops/:productId" element={<ProductDetail />} />
            <Route path="t-shirts/:productId" element={<ProductDetail />} />
            <Route path="shirts/:productId" element={<ProductDetail />} />
            <Route path="sweatshirts/:productId" element={<ProductDetail />} />
            <Route path="hoodies/:productId" element={<ProductDetail />} />
            <Route path="polo-shirts/:productId" element={<ProductDetail />} />
            <Route path="tank-tops/:productId" element={<ProductDetail />} />
            <Route path="jackets/:productId" element={<ProductDetail />} />
            <Route path="blazers/:productId" element={<ProductDetail />} />

            {/* Men Dresses & Jumpsuits */}
            {/* <Route path="dresses-jumpsuits" element={<MenDressesJumpsuits />} /> */}
            <Route path="dresses-jumpsuits/:productId" element={<ProductDetail />} />

            {/* Men Outerwear */}
            <Route path="outerwear" element={<MenOuterwear />} />
            <Route path="jackets" element={<MenJackets />} />
            <Route path="coats" element={<MenCoats />} />
            <Route path="blazers" element={<MenBlazers />} />
            <Route path="bomber-jackets" element={<MenBomberJackets />} />
            <Route path="parkas" element={<MenParkas />} />

            {/* Men Outerwear Dynamic Routing */}
            <Route path="outerwear/:productId" element={<ProductDetail />} />
            <Route path="jackets/:productId" element={<ProductDetail />} />
            <Route path="coats/:productId" element={<ProductDetail />} />
            <Route path="blazers/:productId" element={<ProductDetail />} />
            <Route path="bomber-jackets/:productId" element={<ProductDetail />} />
            <Route path="parkas/:productId" element={<ProductDetail />} />

            {/* Men Activewear */}
            <Route path="activewear" element={<MenActivewear />} />
            <Route path="trackpants" element={<MenTrackpants />} />
            <Route path="gym-shorts" element={<MenGymShorts />} />
            <Route path="workout-t-shirts" element={<MenWorkoutTshirts />} />
            <Route path="sports-jackets" element={<MenSportsJackets />} />
            <Route path="compression-wear" element={<MenCompressionWear />} />
            <Route path="running-shoes" element={<MenRunningShoes />} />

            {/* Men Activewear Dynamic Routing */}
            <Route path="activewear/:productId" element={<ProductDetail />} />
            <Route path="trackpants/:productId" element={<ProductDetail />} />
            <Route path="gym-shorts/:productId" element={<ProductDetail />} />
            <Route path="workout-t-shirts/:productId" element={<ProductDetail />} />
            <Route path="sports-jackets/:productId" element={<ProductDetail />} />
            <Route path="compression-wear/:productId" element={<ProductDetail />} />
            <Route path="running-shoes/:productId" element={<ProductDetail />} />

            {/* Men Suits & Blazers */}
            <Route path="suits-blazers" element={<MenSuitsBlazers />} />
            <Route path="suits" element={<MenSuits />} />
            <Route path="blazers" element={<MenBlazers />} />
            <Route path="waistcoats" element={<MenWaistcoats />} />
            <Route path="tuxedos" element={<MenTuxedos />} />

            {/* Men Suits & Blazers Dynamic Routing */}
            <Route path="suits-blazers/:productId" element={<ProductDetail />} />
            <Route path="suits/:productId" element={<ProductDetail />} />
            <Route path="blazers/:productId" element={<ProductDetail />} />
            <Route path="waistcoats/:productId" element={<ProductDetail />} />
            <Route path="tuxedos/:productId" element={<ProductDetail />} />
          </Route>

          {/* Women Routes */}
          <Route path="/categories/women">
            <Route index element={<WomenProductCategories />} />

            {/* Women Tops */}
            <Route path="tops" element={<WomenTops />} />
            <Route path="t-shirts" element={<WomenTshirts />} />
            <Route path="blouses" element={<WomenBlouses />} />
            <Route path="sweaters" element={<WomenSweaters />} />
            <Route path="sweatshirts" element={<WomenSweatshirts />} />
            <Route path="hoodies" element={<WomenHoodies />} />
            <Route path="tank-tops" element={<WomenTankTops />} />
            <Route path="cardigans" element={<WomenCardigans />} />
            <Route path="polo-shirts" element={<WomenPoloShirts />} />
            <Route path="peplum-tops" element={<WomenPeplumTops />} />
            <Route path="cropped-tops" element={<WomenCroppedTops />} />

            {/* Women Tops Dynamic Routing */}
            <Route path="tops/:productId" element={<ProductDetail />} />
            <Route path="t-shirts/:productId" element={<ProductDetail />} />
            <Route path="blouses/:productId" element={<ProductDetail />} />
            <Route path="sweaters/:productId" element={<ProductDetail />} />
            <Route path="sweatshirts/:productId" element={<ProductDetail />} />
            <Route path="hoodies/:productId" element={<ProductDetail />} />
            <Route path="tank-tops/:productId" element={<ProductDetail />} />
            <Route path="cardigans/:productId" element={<ProductDetail />} />
            <Route path="polo-shirts/:productId" element={<ProductDetail />} />
            <Route path="peplum-tops/:productId" element={<ProductDetail />} />
            <Route path="cropped-tops/:productId" element={<ProductDetail />} />

            {/* Women Bottomwear */}
            <Route path="bottomwear" element={<WomenBottomwear />} />
            <Route path="jeans" element={<WomenJeans />} />
            <Route path="trousers" element={<WomenTrousers />} />
            <Route path="leggings" element={<WomenLeggings />} />
            <Route path="chinos" element={<WomenChinos />} />
            <Route path="culottes" element={<WomenCulottes />} />
            <Route path="shorts" element={<WomenShorts />} />
            <Route path="joggers" element={<WomenJoggers />} />
            <Route path="sweatpants" element={<WomenSweatpants />} />
            <Route path="skirts" element={<WomenSkirts />} />
            <Route path="palazzo-pants" element={<WomenPalazzoPants />} />
            <Route path="midi-skirts" element={<WomenMidiSkirts />} />

            {/* Women Bottomwear Dynamic Routing */}
            <Route path="bottomwear/:productId" element={<ProductDetail />} />
            <Route path="jeans/:productId" element={<ProductDetail />} />
            <Route path="trousers/:productId" element={<ProductDetail />} />
            <Route path="leggings/:productId" element={<ProductDetail />} />
            <Route path="chinos/:productId" element={<ProductDetail />} />
            <Route path="culottes/:productId" element={<ProductDetail />} />
            <Route path="shorts/:productId" element={<ProductDetail />} />
            <Route path="joggers/:productId" element={<ProductDetail />} />
            <Route path="sweatpants/:productId" element={<ProductDetail />} />
            <Route path="skirts/:productId" element={<ProductDetail />} />
            <Route path="palazzo-pants/:productId" element={<ProductDetail />} />
            <Route path="midi-skirts/:productId" element={<ProductDetail />} />

            {/* Women Dresses & Jumpsuits */}
            <Route path="dresses-jumpsuits" element={<WomenDressesJumpsuits />} />
            <Route path="maxi-dresses" element={<WomenMaxiDresses />} />
            <Route path="midi-dresses" element={<WomenMidiDresses />} />
            <Route path="mini-dresses" element={<WomenMiniDresses />} />
            <Route path="cocktail-dresses" element={<WomenCocktailDresses />} />
            <Route path="casual-dresses" element={<WomenCasualDresses />} />
            <Route path="bodycon-dresses" element={<WomenBodyconDresses />} />
            <Route path="tunic-dresses" element={<WomenTunicDresses />} />
            <Route path="jumpsuits" element={<WomenJumpsuits />} />
            <Route path="rompers" element={<WomenRompers />} />
            <Route path="playsuits" element={<WomenPlaysuits />} />

            {/* Women Dresses & Jumpsuits Dynamic Routing */}
            <Route path="dresses-jumpsuits/:productId" element={<ProductDetail />} />
            <Route path="maxi-dresses/:productId" element={<ProductDetail />} />
            <Route path="midi-dresses/:productId" element={<ProductDetail />} />
            <Route path="mini-dresses/:productId" element={<ProductDetail />} />
            <Route path="cocktail-dresses/:productId" element={<ProductDetail />} />
            <Route path="casual-dresses/:productId" element={<ProductDetail />} />
            <Route path="bodycon-dresses/:productId" element={<ProductDetail />} />
            <Route path="tunic-dresses/:productId" element={<ProductDetail />} />
            <Route path="jumpsuits/:productId" element={<ProductDetail />} />
            <Route path="rompers/:productId" element={<ProductDetail />} />
            <Route path="playsuits/:productId" element={<ProductDetail />} />

            {/* Women Outerwear */}
            <Route path="outerwear" element={<WomenOuterwear />} />
            <Route path="jackets" element={<WomenJackets />} />
            <Route path="coats" element={<WomenCoats />} />
            <Route path="blazers" element={<WomenBlazers />} />
            <Route path="cardigans" element={<WomenCardigans />} />
            <Route path="bomber-jackets" element={<WomenBomberJackets />} />
            <Route path="trench-coats" element={<WomenTrenchCoats />} />
            <Route path="puffer-jackets" element={<WomenPufferJackets />} />
            <Route path="parkas" element={<WomenParkas />} />
            <Route path="peacoats" element={<WomenPeacoats />} />
            <Route path="denim-jackets" element={<WomenDenimJackets />} />

            {/* Women Outerwear Dynamic Routing */}
            <Route path="outerwear/:productId" element={<ProductDetail />} />
            <Route path="jackets/:productId" element={<ProductDetail />} />
            <Route path="coats/:productId" element={<ProductDetail />} />
            <Route path="blazers/:productId" element={<ProductDetail />} />
            <Route path="cardigans/:productId" element={<ProductDetail />} />
            <Route path="bomber-jackets/:productId" element={<ProductDetail />} />
            <Route path="trench-coats/:productId" element={<ProductDetail />} />
            <Route path="puffer-jackets/:productId" element={<ProductDetail />} />
            <Route path="parkas/:productId" element={<ProductDetail />} />
            <Route path="peacoats/:productId" element={<ProductDetail />} />
            <Route path="denim-jackets/:productId" element={<ProductDetail />} />

            {/* Women Activewear */}
            <Route path="activewear" element={<WomenActivewear />} />
            <Route path="sports-bras" element={<WomenSportsBras />} />
            <Route path="gym-t-shirts" element={<WomenGymTshirts />} />
            <Route path="trackpants" element={<WomenTrackpants />} />
            <Route path="leggings" element={<WomenLeggings />} />
            <Route path="yoga-pants" element={<WomenYogaPants />} />
            <Route path="running-shoes" element={<WomenRunningShoes />} />
            <Route path="sports-jackets" element={<WomenSportsJackets />} />
            <Route path="active-shorts" element={<WomenActiveShorts />} />
            <Route path="compression-wear" element={<WomenCompressionWear />} />
            <Route path="athletic-hoodies" element={<WomenAthleticHoodies />} />

            {/* Women Activewear Dynamic Routing */}
            <Route path="activewear/:productId" element={<ProductDetail />} />
            <Route path="sports-bras/:productId" element={<ProductDetail />} />
            <Route path="gym-t-shirts/:productId" element={<ProductDetail />} />
            <Route path="trackpants/:productId" element={<ProductDetail />} />
            <Route path="leggings/:productId" element={<ProductDetail />} />
            <Route path="yoga-pants/:productId" element={<ProductDetail />} />
            <Route path="running-shoes/:productId" element={<ProductDetail />} />
            <Route path="sports-jackets/:productId" element={<ProductDetail />} />
            <Route path="active-shorts/:productId" element={<ProductDetail />} />
            <Route path="compression-wear/:productId" element={<ProductDetail />} />
            <Route path="athletic-hoodies/:productId" element={<ProductDetail />} />

            {/* Women Footwear */}
            <Route path="footwear" element={<WomenFootwear />} />
            <Route path="sneakers" element={<WomenSneakers />} />
            <Route path="flats" element={<WomenFlats />} />
            <Route path="heels" element={<WomenHeels />} />
            <Route path="boots" element={<WomenBoots />} />
            <Route path="sandals" element={<WomenSandals />} />
            <Route path="wedges" element={<WomenWedges />} />
            <Route path="loafers" element={<WomenLoafers />} />
            <Route path="flip-flops" element={<WomenFlipFlops />} />
            <Route path="ballet-flats" element={<WomenBalletFlats />} />
            <Route path="slides" element={<WomenSlides />} />

            {/* Women Footwear Dynamic Routing */}
            <Route path="footwear/:productId" element={<ProductDetail />} />
            <Route path="sneakers/:productId" element={<ProductDetail />} />
            <Route path="flats/:productId" element={<ProductDetail />} />
            <Route path="heels/:productId" element={<ProductDetail />} />
            <Route path="boots/:productId" element={<ProductDetail />} />
            <Route path="sandals/:productId" element={<ProductDetail />} />
            <Route path="wedges/:productId" element={<ProductDetail />} />
            <Route path="loafers/:productId" element={<ProductDetail />} />
            <Route path="flip-flops/:productId" element={<ProductDetail />} />
            <Route path="ballet-flats/:productId" element={<ProductDetail />} />
            <Route path="slides/:productId" element={<ProductDetail />} />

        
          
            {/* Women Lingerie & Sleepwear */}
            <Route path="lingerie-sleepwear" element={<WomenLingerieSleepwear />} />
            <Route path="bras" element={<WomenBras />} />
            <Route path="panties" element={<WomenPanties />} />
            <Route path="shapewear" element={<WomenShapewear />} />
            <Route path="sleepwear" element={<WomenSleepwear />} />
            <Route path="nightgowns" element={<WomenNightgowns />} />
            <Route path="pajama-sets" element={<WomenPajamaSets />} />
            <Route path="lingerie-sets" element={<WomenLingerieSets />} />
            <Route path="robes" element={<WomenRobes />} />
            <Route path="bodysuits" element={<WomenBodysuits />} />

            {/* Women Lingerie & Sleepwear Dynamic Routing */}
            <Route path="lingerie-sleepwear/:productId" element={<ProductDetail />} />
            <Route path="bras/:productId" element={<ProductDetail />} />
            <Route path="panties/:productId" element={<ProductDetail />} />
            <Route path="shapewear/:productId" element={<ProductDetail />} />
            <Route path="sleepwear/:productId" element={<ProductDetail />} />
            <Route path="nightgowns/:productId" element={<ProductDetail />} />
            <Route path="pajama-sets/:productId" element={<ProductDetail />} />
            <Route path="lingerie-sets/:productId" element={<ProductDetail />} />
            <Route path="robes/:productId" element={<ProductDetail />} />
            <Route path="bodysuits/:productId" element={<ProductDetail />} />

            {/* Women Swimwear */}
            <Route path="swimwear" element={<WomenSwimwear />} />
            <Route path="bikinis" element={<WomenBikinis />} />
            <Route path="one-piece-swimsuits" element={<WomenOnePieceSwimsuits />} />
            <Route path="tankinis" element={<WomenTankinis />} />
            <Route path="swim-dresses" element={<WomenSwimDresses />} />
            <Route path="cover-ups" element={<WomenCoverUps />} />
            <Route path="swim-shorts" element={<WomenSwimShorts />} />

            {/* Women Swimwear Dynamic Routing */}
            <Route path="swimwear/:productId" element={<ProductDetail />} />
            <Route path="bikinis/:productId" element={<ProductDetail />} />
            <Route path="one-piece-swimsuits/:productId" element={<ProductDetail />} />
            <Route path="tankinis/:productId" element={<ProductDetail />} />
            <Route path="swim-dresses/:productId" element={<ProductDetail />} />
            <Route path="cover-ups/:productId" element={<ProductDetail />} />
            <Route path="swim-shorts/:productId" element={<ProductDetail />} />
          </Route>

          {/* Accessories Routes */}
          <Route path="/categories/accessories">
            <Route index element={<AccessoriesHandbags />} />
            <Route path="handbags" element={<AccessoriesHandbags />} />
            <Route path="tote-bags" element={<AccessoriesToteBags />} />
            <Route path="clutches" element={<AccessoriesClutches />} />
            <Route path="backpacks" element={<AccessoriesBackpacks />} />
            <Route path="crossbody-bags" element={<AccessoriesCrossbodyBags />} />
            <Route path="wallets" element={<AccessoriesWallets />} />
            <Route path="sunglasses" element={<AccessoriesSunglasses />} />
            <Route path="hats" element={<AccessoriesHats />} />
            <Route path="scarves" element={<AccessoriesScarves />} />
            <Route path="belts" element={<AccessoriesBelts />} />
            <Route path="watches" element={<AccessoriesWatches />} />
            <Route path="jewelry" element={<AccessoriesJewelry />} />
            <Route path="hair-accessories" element={<AccessoriesHairAccessories />} />
            <Route path="tights" element={<AccessoriesTights />} />

            {/* Accessories Dynamic Routing */}
            <Route path="handbags/:productId" element={<ProductDetail />} />
            <Route path="tote-bags/:productId" element={<ProductDetail />} />
            <Route path="clutches/:productId" element={<ProductDetail />} />
            <Route path="backpacks/:productId" element={<ProductDetail />} />
            <Route path="crossbody-bags/:productId" element={<ProductDetail />} />
            <Route path="wallets/:productId" element={<ProductDetail />} />
            <Route path="sunglasses/:productId" element={<ProductDetail />} />
            <Route path="hats/:productId" element={<ProductDetail />} />
            <Route path="scarves/:productId" element={<ProductDetail />} />
            <Route path="belts/:productId" element={<ProductDetail />} />
            <Route path="watches/:productId" element={<ProductDetail />} />
            <Route path="jewelry/:productId" element={<ProductDetail />} />
            <Route path="hair-accessories/:productId" element={<ProductDetail />} />
            <Route path="tights/:productId" element={<ProductDetail />} />
          </Route>

          {/* Footwear Routes */}
          <Route path="/categories/footwear">
            <Route index element={<FootwearSneakers />} />
            <Route path="sneakers" element={<FootwearSneakers />} />
            <Route path="flats" element={<FootwearFlats />} />
            <Route path="heels" element={<FootwearHeels />} />
            <Route path="boots" element={<FootwearBoots />} />
            <Route path="sandals" element={<FootwearSandals />} />
            <Route path="wedges" element={<FootwearWedges />} />
            <Route path="loafers" element={<FootwearLoafers />} />
            <Route path="flip-flops" element={<FootwearFlipFlops />} />
            <Route path="ballet-flats" element={<FootwearBalletFlats />} />
            <Route path="slides" element={<FootwearSlides />} />

            {/* Footwear Dynamic Routing */}
            <Route path="sneakers/:productId" element={<ProductDetail />} />
            <Route path="flats/:productId" element={<ProductDetail />} />
            <Route path="heels/:productId" element={<ProductDetail />} />
            {/* <Route/Customized Footwear Dynamic Routing */} 
            <Route path="boots/:productId" element={<ProductDetail />} />
            <Route path="sandals/:productId" element={<ProductDetail />} />
            <Route path="wedges/:productId" element={<ProductDetail />} />
            <Route path="loafers/:productId" element={<ProductDetail />} />
            <Route path="flip-flops/:productId" element={<ProductDetail />} />
            <Route path="ballet-flats/:productId" element={<ProductDetail />} />
            <Route path="slides/:productId" element={<ProductDetail />} />
          </Route>
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default Routing;
