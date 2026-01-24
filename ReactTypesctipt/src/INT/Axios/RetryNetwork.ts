import React from 'react'
import { axiosApi } from './networkInterceptors'
import { retryConfig, type RetryType } from './retryConfig'


const sleep = (ms: number) => {
   return new Promise(res => setTimeout(res, ms))
}

const shouldRetry = (error: any) => {
    if(!navigator.onLine) return false;
    
    if(!error.response) return true;   // may be DNS/Network issues, may sortout after retries

    const status = error.response.status;
    return status>=500 && status<600;     //it returns true if err is server side else return false
}

const getDelay = (policy: RetryType, retryCount: number) => {
let delay = 0;
   if(policy.backoff === "exponential"){
    delay = policy.delayMs * Math.pow(2, retryCount)
   }else{
    delay = policy.delayMs
   }
   return Math.min(delay, policy.delayMs)
}

// type Props = {
//   retryPolicy: keyof typeof retryConfig   //when we use this type and write like this retryConfig[retryPolicy];  
// }                                        // err => Props type cant be used as index type

const attachRetryNetwork = (retryPolicy:  keyof typeof retryConfig) => {
   const policy = retryConfig[retryPolicy]; 
   axiosApi.interceptors.response.use(
    res => res,
    async err => {
      const config = err.config;
      config.__retryCount ??= 0;

      if(config.__retryCount >= policy.maxRetries || !shouldRetry(err)){
        return Promise.reject(err)
      }

      config.__retryCount++;
      const delay = getDelay(policy, config.__retryCount)
      await sleep(delay)
      return axiosApi(config)
    }
   )
}

export default attachRetryNetwork



















package components

import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static org.junit.Assert.assertEquals
import static org.junit.Assert.assertNotEquals
import static org.junit.Assert.assertTrue

import com.kms.katalon.core.model.FailureHandling
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import cucumber.api.java.en.And
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import utilities.CommonUtils
import io.cucumber.datatable.DataTable
import junit.framework.Assert

import java.text.SimpleDateFormat;
import java.util.Date;

import org.openqa.selenium.WebElement



class components {
	/**
	 * The step definitions below match with Katalon sample Gherkin steps
	 */
	@Given("I navigate to components tab")
	def I_navigate_to_components_tab() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/navigateToComponentsTab'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I navigate to components Tab")
	def navigate_to_components_tab() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/navigateToComponentsTab'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("Click on Create Component button in Components Tab")
	def clickOnCreateComponentButton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/clickOnCreateComponentButton'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create a List component single select (.+) and category (.+)")
	def createListComponentSingleSelect(String component1, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createListComponentSingleSelect'),
				[('component1'):component1, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create a text Component (.*) and category (.*)")
	def createTextComponent(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createTextComponentWithCategory'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I create a text Component")
	def I_create_a_text_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Components/createTextComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create a decimal component")
	def I_create_a_decimal_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createDecimalComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I create a float number component (.*)")
	def I_create_a_float_number_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createFloatNumberComponent'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create a number component")
	def I_create_a_number_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createNumberComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create a scale component")
	def I_create_a_scale_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/createScaleComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Search for component (.+)")
	def searchForComponent(String component1) {
		println("Debug: Searching for Component1 -> " + component1)

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/searchCreatedComponent'),
				[('component1'):component1], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Delete Component")
	def deleteComponent() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/deleteComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Verify Component Deleted")
	def verifyComponentDeleted() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyComponentDeleted'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Type '(.*)' of the Component")
	def verifyTypeOfComponent(String type) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyTypeOfComponent'),
				[('type'):type], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Component Menu")
	def verifyComponentMenu() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyComponentMenu'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I click on Type in Components Filter Dropdown")
	def clickOnTypeInFilterDropdown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnTypeInComponentsFilterDropdown'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Viewer Tool Types In Filter Dropdown")
	def verifyViewerToolTypesInFilterDropdown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyViewerToolTypesInFilterDropdown'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Filtering '(.*)' Components")
	def verifyFilteringComponents(String type) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyFilteringComponents'),
				['type':type], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Clear all Component Filters")
	def clearAllComponentFilters() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clearAllComponentFilters'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Viewer Components sorting based on Type")
	def verifyViewerComponentsSortingBasedOnType() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyViewerComponentsSortingBasedOnType'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Components sorting based on Type")
	def verifyComponentsSortingBasedOnType() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyComponentsSortingBasedOnType'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Click on Component menu button and edit the Component")
	def clickOnComponentMenubutton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/clickOnComponentMenu'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then('Verify the Component Techical Name contains (.*) and (.*)')
	def verifyTheComponentTechicalName(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyTheComponentTechicalName'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@And('Verify the Component Techical Name max Char')
	def verifyTheComponentTechicalNameMaxChar() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyTheComponentTechincalNameMaxChar'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And('Verify the Component Techical Name displayed error message if it is not unique for (.*) and (.*)')
	def verifyTheComponentTechicalNamedisplayedErrorMessageIfItIsNotUniqueFor(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyTheComponentTechicalNamedisplayedErrorMessageIfItIsNotUnique'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@Then('I navigate to forms tab')
	def I_navigate_to_forms_tab() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/navigateToFormsTab'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I search and add components by name")
	def I_search_and_add_components_by_name() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Components/searchAndAddComponentsByName'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("DragAndDrop Component by name (.*) in Canvas")
	def dragAnddropComponentByName(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/dragAnddropComponentByName'),
				[('componentLbl'):componentLbl], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify for Technical Name for (.*) in Form Properties that contains (.*)")
	def verifyForTechnicalNameInFormProperties(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyForTechnicalNameInFormProperties'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify that Technical Name of Components (.*) and (.*) are unique on Form level")
	def verifyThatTechnicalNameOfComponentsAreUniqueOnFormLevel(String componentLbl, String componentLbl2) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyComponentsTechNameIsUnique'),
				[('componentLbl'):componentLbl, ('componentLbl2'):componentLbl2], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Drag and Drop List Component")
	def drag_and_drop_list_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/DragAndDropListComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I choose Target from dropdown")
	def i_choose_target_from_dropdown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/chooseTarget'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Drag and Drop text Component")
	def drag_and_drop_text_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/dragAndDropText'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Drag and Drop number component")
	def drag_and_drop_number_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/dragAndDropNumber'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Select list component in canvas")
	def select_list_component_in_canvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/selectListInCanvas'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that the chevron for Expand and Colapse is not present")
	def i_verify_that_the_chevron_for_Expand_and_Colapse_is_not_present() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyChevronNotPresent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I add options for the list components")
	def i_add_options_for_the_list_components() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/AddOptionsToListComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I select horizontal as choice orientation")
	def i_select_horizontal_as_choice_orientation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/horizontalChoiceOrientation'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that Layout setting is not present")
	def i_verify_that_layout_setting_is_not_present() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/layoutSettingNotPresent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I confirm that the list is in horizontal orientation")
	def i_confirm_that_the_list_is_in_horizontal_orientation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/previewHorizontalOrientation'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I select vertical as choice orientation")
	def i_select_vertical_as_choice_orientation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectVerticalOrientation'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I verify (.*) orientation is pre-selected and (.*) orientation is disabled for selection")
	def i_verify_orientation_is_disabled(String orientationSelected, String orientationDisabled) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyOrientationPreSelectedAndOtherIsDisabled'),
				[('orientationSelected'):orientationSelected, ('orientationDisabled'):orientationDisabled],
				FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create a Date component (.*) and category (.*)")
	def createDateComponentwithCatergory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createDateCompWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@And("Create a Time component (.*) and category (.*)")
	def createTimeComponentwithCatergory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createTimeCompwithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@And("Create a Date and Time component (.*) and category (.*)")
	def createDateAndTimeComponentwithCatergory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createDateAndTimeCompWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@Then("I select one column as layout setting")
	def i_select_one_column_as_layout_setting() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectOneColumn'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I confirm that the list is shown in one column")
	def i_confirm_that_the_list_is_shown_in_one_column() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/PreviewOneColumn'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I select two columns as layout setting")
	def i_select_two_columns_as_layout_setting() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectTwoColumns'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I confirm that the list is shown in two columns")
	def i_confirm_that_the_list_is_shown_in_two_columns() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/PreviewTwoColumns'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Touchscreen is present in Layout Options")
	public void i_verify_Touchscreen_is_present_in_Layout_Options() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyTouchScreenOption'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify user can select only one Layout Option")
	public void i_verify_user_can_select_only_one_Layout_Option() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyOnlyOneLayoutOptionIsSelected'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify one column (.*) pre-selected as layout setting and two-columns is disabled")
	public void i_verify_one_column_is_pre_selected_as_layout_setting_and_two_columns_is_disabled(String isSelected) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyOneColoumnIsPreSelected'),
				['isSelected':isSelected], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I select (.*) as layout Option")
	public void i_select_layout_option(String option) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectLayoutOptionForListComponent'),
				['option':option], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Layout Selection is present with 3 clickable options : Desktop, Tablet, Mobile")
	public void i_verify_layout_selection() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyLayoutSelection'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Layout Selection hover values and default value")
	public void i_verify_one_option_can_be_selected() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyLayoutHoverAndDefaultValue'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}


	@And("Drag and Drop '(.*)' List Component")
	def drag_and_drop_mutli_list_component(String listType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/DragAndDropMultiListComponent'),
				['listType':listType], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Drag and Drop (.*) List type Component")
	def drag_and_drop_list_component(String listType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/DragAndDropMultiListComponent'),
				['listType':listType], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I select (.*) in Layout Selection")
	public void i_select_Tablet_in_Layout_Selection(String layoutSelection) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/SelectLayoutType'),
				['layoutSelection':layoutSelection], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that (.*) is retained")
	public void i_verify_that_Tablet_is_retained(String layoutSelection) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyLayoutSelectionIsRetained'),
				['layoutSelection':layoutSelection], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Show as Table is (.*)")
	public void i_verify_show_as_table(String action) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyShowAsTableForLayoutSelection'),
				['action':action], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Table (.*) displayed")
	public void i_verify_table(String isOrIsNot) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/iSpiro/VerifyTableForLayoutSelection'),
				['isOrIsNot':isOrIsNot], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that Enable equal vertical sizing selected by default")
	def i_verify_that_Enable_equal_vertical_sizing_selected_bydefault() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/DefaultSelectionOfEnableEqualVerticalSizing'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Serch Manually created form")
	def i_Serch_Manually_created_form() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Common/SerachForm'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify Layout Option For Single Select List")
	def I_Verify_Layout_Option_For_Single_Select_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyLayoutOptionForSingleSelectList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I Click On ButtonList")
	def I_Click_On_ButtonList() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnButtonList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I Click On Dropdown For Single Select List")
	def I_Click_On_Dropdown_For_Single_Select_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnDropdownForSingleSelectList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I Click On RadioList")
	def I_Click_On_RadioList() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnRadioList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify RadioList With Option On Preview Screen Without Enable Equal Vertical Size Option")
	def I_Verify_RadioList_With_Option_On_Preview_Screen_Without_Enable_Equal_Vertical_Size_Option() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyRadioListWithOptionOnPreview'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I Verify RadioList With Option On Preview Screen With Enable Equal Vertical Size Option")
	def I_Verify_RadioList_With_Option_On_Preview_Screen_With_Enable_Equal_Vertical_Size_Option() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyRadioLIstOptionWhenVerticalSizeTrue'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I Verify Disable Equal Vertical Size Option")
	def I_Verify_Disable_Equal_Vertical_Size_Option() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/EnableEqualVerticalSizeOptionDisable'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I Login on device and navigate to Demo page")
	def I_Login_on_device_and_navigate_to_Demo_page() {
		WebUI.callTestCase(findTestCase('Test Cases/Forms_Engine/Keyword_Test'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I Verify ButtonList Option On Preview Screen for Single Select List")
	def I_Verify_ButtonList_Option_On_Preview_Screen_for_Single_Select_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyButtonListOptionOnPreviewScreen'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify Dropdown Option On Preview Screen For Single Select")
	def I_Verify_Dropdown_Option_On_Preview_Screen_For_Single_Select() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyDropdownOptionOnPreviewScreenForSingleSelect'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I Verify Layout Option For Multi Select List")
	def I_Verify_Layout_Option_For_Multi_Select_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyLayoutOptionForMultiselectList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Given("I Click On Multi Dropdown")
	def I_Click_On_Multi_Dropdown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnButtonList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Given("I Click On Checkbox List")
	def I_Click_On_Checkbox_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnRadioList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify Checkbox List With Option On Preview Screen With Enable Equal Vertical Size Option")
	def I_Verify_Checkbox_List_With_Option_On_Preview_Screen_With_Enable_Equal_Vertical_Size_Option() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyCheckboxListOptionOnPreviewPage'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify Dropdown Option On Preview Screen For Multi Select List")
	def I_Verify_Dropdown_Option_On_Preview_Screen_For_Multi_Select_List() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyDropdownOptionOnPreviewScreenForMultiSelectList'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Image Viewer Input is present in the Component drpdwn")
	public void i_verify_image_viewer_input_is_present_in_the_Component_drpdwn() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyImageViewerInputIsPresentInTheComponentDrpdwn'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I click on Image Viewer Input button")
	public void i_click_on_Image_Viewer_Input_button() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnImageViewerInputButton'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Image Viewer Input popup is displayed")
	public void i_verify_image_viewer_input_popup_is_displayed() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyImageViewerInputPopupIsDisplayed'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add Label (.*), Category, TechName and Description in Image Viewer Input Component")
	public void i_add_Label_Category_TechNam_and_Description_in_Image_Viewer_Input_Component(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addLabelCategoryTechNameAndDescriptionInImageViewerInputComponent'),
				['componentLbl':componentLbl], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify user can select tool type from Angle, Cross, Ellipse, and Line")
	public void i_verify_user_can_select_tool_type_from_Angle_Cross_Ellipse_and_Line() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyUserCanSelectToolTypeFromAngleCrossEllipseAndLine'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that based on the selected tool type appropriate measurement fields are displayed")
	public void i_verify_that_based_on_the_selected_tool_type_appropriate_measurement_fields_are_displayed() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatBasedOnTheSelectedToolTypeAppropriateMeasurementFieldsAreDisplayed'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that user is not able to save the component unless atleast one of the annotation fields is checked")
	public void i_verify_that_user_is_not_able_to_save_the_component_unless_atleast_one_of_the_annotation_fields_is_checked() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatUseIsNotAbleToSaveTheComponentUnlessAtleastOneOfTheAnnotationFieldsIsChecked'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I click on Cancel button in Component popup")
	public void i_click_on_Cancel_button() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnCancelButtonInComponentPopup'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify Cancel popup is displayed")
	public void i_verify_Cancel_popup_is_displayed() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyCancelPopupIsDisplayed'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I select '(.*)' Tool Type and click on Save button")
	public void i_select_Angle_Tool_Type_and_click_on_Save_button(String toolType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/selectToolTypeAndClickOnSaveButton'),
				['toolType':toolType], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that tool type cannot be changed during editing")
	public void i_verify_that_tool_type_cannot_be_changed_during_editing() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/toolTypeCannotBeChangedDuringEditing'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I remove all measurement fields from the selected '(.*)' tool type")
	public void i_remove_all_measurement_fields_from_the_selected_tool_type(String toolType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/removeAllMeasurementFieldsFromTheSelectedToolType'),
				['toolType':toolType], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that Tool Type error message is shown")
	public void i_verify_that_Tool_Type_error_message_is_shown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatToolTypeErrorMessageIsShown'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I click on Component Save button")
	public void i_click_on_Component_Save_button() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnComponentSaveButton'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create a component (.*)")
	def i_create_a_component(String componentType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createComponent'),
				[('componentType'):componentType], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create text component (.*)")
	def i_create_text_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createTxtComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create number component (.*)")
	def i_create_number_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createNumbComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create time component (.*)")
	def i_create_time_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createTimeComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create date component (.*)")
	def i_create_date_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createDateComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}


	@Then("Create List component(.*) with Category(.*) of type '(.*)' and configure coded value as '(.*)'")
	def createCustomListComponentRichText(String component,String category, String listType,String codedValueType ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateCustomListComponentRichText'), [('componentLbl'):component,('category'):category,('listType'):listType, ('codedValueType'):codedValueType], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@And("I create viewer component (.*)")
	def i_create_viewer_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createViewerComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I create list component (.*)")
	def i_create_list_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createListComp'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I click on component properties")
	def i_click_on_component_properties() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnCompProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I deactivate the component")
	def i_deactivate_the_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/deactivateComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify that status of the component is inactive")
	def i_verify_that_status_of_the_component_is_inactive() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyInactiveStatus'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify edit Option is not present")
	def i_verify_edit_Option_is_not_present() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/editNotPresent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I activate the component")
	def i_activate_the_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/activateComponent'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify status of the component is active")
	def i_verify_that_status_of_the_component_is_active() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyActiveStatus'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add table section in canvas")
	def i_add_table_section_in_canvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addTableSectionInCanvas'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Drag and Drop Viewer Component (.*) into Table")
	def dragAndDropViewerComponentIntoTable(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/dragAndDropViewerComponentIntoTable'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add (.*), Category, TechName and Description in Image Viewer Cross")
	def i_add_Label_Category_TechNam_and_Description_in_Image_Viewer_Cross(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addLabelCategoryTechNameAndDescriptionInImageViewerCrossComponent'),
				['component':component], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add (.*), Category, TechName and Description in Image Viewer Angle")
	def i_add_Label_Category_TechNam_and_Description_in_Image_Viewer_Angle(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addLabelCategoryTechNameAndDescriptionInImageViewerAngleComponent'),
				['component':component], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add (.*), Category, TechName and Description in Image Viewer Ellipse")
	def i_add_Label_Category_TechNam_and_Description_in_Image_Viewer_Ellipse(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addLabelCategoryTechNameAndDescriptionInImageViewerEllipseComponent'),
				['component':component], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I add (.*), Category, TechName and Description in Image Viewer Line")
	def i_add_Label_Category_TechNam_and_Description_in_Image_Viewer_Line(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addLabelCategoryTechNameAndDescriptionInImageViewerLineComponent'),
				['component':component], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I Drag and Drop Component (.*)")
	def i_drag_and_drop_component(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/dragNdropViewerComponent'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create List Component With Coded Value AsText (.+) and category (.+)")
	def CreateListComponentSingleSelectWithCodedValueAsText(String component2, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateListComponentSingleSelectWithCodedValueAsText'),
				[('component2'):component2, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create List Component With Coded Value AsNumber (.*) and category (.*)")
	def CreateListComponentSingleSelectWithCodedValueAsNumber(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateListComponentSingleSelectWithCodedValueAsNumber'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Verify Show Coded Value Checkbox On List Component Modal")
	def IVerifyShowCodedValueCheckboxOnListComponentModal() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyShowCodedValueCheckboxOnListComponentModal'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Drag and drop component by (.*)")
	def verifyDragAndDrop(String Component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/Drag and drop component'), [('component2'):Component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("I Verify Display Coded Values in Form Preview Based on Selection")
	def Display_Coded_Values_in_Form_Preview_Based_on_Selection() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Display Coded Values in Form Preview Based Selection'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify (.*) option is listed in the dropdown list")
	def i_verify_dropdownoption_listed(String component) {
		//WebUI.click(findTestObject('Object Repository/Forms_Engine/Header/cmpnt_type',[('index'):6]))
		int index = 4;
		if (component.equals("Scale")) {
			index = 6
		} else if(component.equals("List")) {
			index = 4
		}

		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/Header/cmpnt_type',[('index'): index]), 3)
	}

	@When("I click on (.*) option in the dropdown list")
	def i_click_on_dropdown_listitem(String component) {
		WebUI.click(findTestObject('Object Repository/Forms_Engine/Header/cmpnt_type',[('index'):4]))
	}

	@Then("I verify (.*) window is displayed")
	def i_verify_windos_is_displayed(String component) {
		//WebUI.enhancedClick(findTestObject('Object Repository/Forms_Engine/ComponentsTable/componentLable'))
		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/ComponentsTable/componentLable'), 3)
	}

	@Then("I Verify Discard Changes Pop Up Appears")
	def i_verify_popup_is_displayed() {
		WebUI.delay(1)
		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/FormDesign/Canvas/Discard_ModelPopup/discard_btn_cnfm'), 3)
	}


	@Then("I verify the Scale component is created successfully")
	def i_verify_scale_component_is_created_successfully() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyActiveStatus'),[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("Search for components using label (.*)")
	def searchComponentWithLabel(String Component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/SearchComponent'),[('Component'):Component], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I Verify NRS On Preview Screen with (.*) and (.*)")
	def I_Verify_NRS_On_Preview_Screen(String LowestRatingText , String HighestRatingText ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/PreviewSection/VerifyNRSOnPreviewScreen'),
				[('LowestRatingText'):LowestRatingText , ('HighestRatingText'):HighestRatingText],
				FailureHandling.STOP_ON_FAILURE)
		System.out.println("lowestRatingText value: " + LowestRatingText)
	}

	@Then("I Verify Coded Value Type Disable")
	def I_Verify_Coded_Value_Type_Disable() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyCodedValueTypeDisable'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}


	@Then("Verify coded values in form canvas")
	def verifyshowcodedvalue() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyShowCodedValueCheckBoxinCanvas'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify coded value validation error messages in form canvas")
	def verifyErrorMessages() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/NumberCodedValueErrorMsgValidations'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify coded value accepts only number")
	def verifynumberacceptance() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyNumberCodedValueAcceptsNumber'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Uniqueness validation of number coded value")
	def uniquenessValidation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/UniquenessValidationofNumberCodedValues'),	[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify text coded value validation error messages in form canvas")
	def verifyErrorMessagesforTextCodedValue() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/TextCodedValueErrorMsgValidations'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Click on forms tab")
	def clickOnFormsTab() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnFormsTab'),[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify Text coded values in form canvas")
	def verifyTextCodedValueinFormCanvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyTextCodedValuesinFormCanvas'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Uniqueness validation of text coded value")
	def uniquenessValidationOfTextCodedValue() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/UniquenessValidationofTextCodedValue'),[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify the uniquessness of Coded Values in the 'Create List Component' window")
	def i_verify_uniqueness_of_coded_value_in_list_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyUniquessOfCodedValuesInListComponentCreation'),[:], FailureHandling.STOP_ON_FAILURE)
	}


	@Then("I verify number component decimal places helper text contains (.*) decimals")
	def i_verify_the_number_component_decimal_places_helper_text(String number) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyNumberComponentDecimalPlacesHelperText'),
				[('number'):number], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify the component is created successfully")
	def i_verify_component_is_created_successfully() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyActiveStatus'),[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify data type is Float in Form Properties")
	def i_verify_data_type_is_Float_in_Form_Properties() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyDataTypeIsFloatInFormProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("I verify the Number of decimal places dropdown list contains seven options")
	def i_verify_the_Number_of_decimal_places_dropdown_list_contains_7_options() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/verifyTheNumberOfDecimalPlacesDropdownListContains7Options'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}


	@When("I select number of decimal places (.*) option")
	def i_select_number_of_decimal_places_option(String number) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/selectNumberOfDecimalPlacesOption'),
				[('number'):number], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify Text coded value auto populated based on choice")
	def verifyTextcodedValueAutoPopulated() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyCodedValueAutopopulatedBasedonChoice'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Drag and drop  second component by (.*)")
	def verifyDragAndDropSecondComponent(String Component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/DragAndDropComponent1'), [('Component'):Component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Create a Number component (.*) and category (.*)")
	def createNumberComponentwithCatergory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateNumberComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Create a Scale component (.*) and category (.*)")
	def createScaleComponentWithCategory(String componentLbl, String category) {

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateScaleComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Create a Form (.*) and category (.*) and add all components with same category")
	def createFormwithCategoryandaddComponents(String formLbl,String category ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/CreateFormwithCategoryAndAddComponents'), [('formLbl'):formLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Create a Form (.*) and category (.*) and add the newly created component (.*)")
	def createFormwithCategoryandaddSameComponents(String formLbl,String category,String Component1) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/CreateFormwithCategoryAndAddSpecificComponent'), [('formLbl'):formLbl,('category'):category,('Component1'):Component1], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select the 1st Number component in form")
	def clickOnNumberComponent() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/SelectTheNumberComponent'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Click on Add Calculation and verify Calculation popup or Expression builder displayed")
	def clickAddCalculation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/ClickOnAddCalculation'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select Math Function (.*)")
	def selectMathFunction(String selectFunction) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/SelectMathFunction'), [('selectFunction'):selectFunction], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Add one question to calculation")
	def selectQuestions() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddQuestions'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify save button is diabled if less than two question is added in calculation")
	def unabletoSavewithOneQuestionIncalculation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyunabletosaveCalculationwithOneQuestion'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Clicking X button to close the calculation popup")
	def verifyXbuttontoCloseCalc() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/ClickonXbutton'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Add (.*) of Questions for calculation")
	def AddMultipleQuestions(String count) {

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddMultipleQuestionsForCalculation'), [('count'):count], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Removing all questions by clicking x button in expressionbox")
	def verifyRemoveQuestionsUsingXbutton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/CancelQuestionsUsingX-button'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select (.*) Math Function  and Add (.*) of Questions for calculation")
	def selectMathFunctionAndAddQuestions(String selectFunction,String count  ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/SelectMathFunctionAndAddQuestions'), [('selectFunction'):selectFunction,('count'):count], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Save Math calculation")
	def saveMathFunction() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/Save Math Calculation'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Selecting component By index (.*) in form canvas")
	def selectComponentByIndex(String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/SelectComponentByindex'), [('index'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select Text component (.*) and verify it is not showing in calculate expression")
	def verifyMathNotIncludeText(String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyCalculationnotallowsTextDataType'), [('index'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Given("Verify the Caliculation (.*) displayed")
	public void verify_the_Caliculation_displayed(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyTheCaliculationDisplayed'),[('component'):component]
		, FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify the Rule appears (.*) under Behavior & Logic with correct function and parameters")
	public void verify_the_Rule_appears_under_Behavior_Logic_with_correct_function_and_parameters(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyTheRuleAppears'),[('component'):component]
		, FailureHandling.STOP_ON_FAILURE)
	}
	@When("Add three rows for inside Table component")
	public void add_three_rows_for_inside_Table_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/AddRowsForInsideTableComponent'),[:]
		, FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Configure {string} Rule with numeric column")
	public void configure_Rule_with_numeric_column(String Function) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ConfigureRuleWithNumericColumn'),[('selectFunction'):Function]
		, FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify that the ResultField correctly shows the value from the numeric column when the {string} rule is applied")
	public void verify_that_the_ResultField_correctly_shows_the_value_from_the_numeric_column_when_the_rule_is_applied(String Function) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyResultFieldShowsValueForNumericColumnWhenRuleApplied'),[('Function'):Function]
		, FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify ResultField displays three with counting three values")
	public void verify_ResultField_displays_three_with_counting_three_values() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyResultFieldDisplaysTheRowCount'),[:]
		, FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify ResultField updates automatically according to AGG FX formula.")
	public void verify_ResultField_updates_automatically_according_to_AGG_FX_formula() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyResultFieldDisplaysTheRowCount'),[:]
		, FailureHandling.STOP_ON_FAILURE)
	}


	@And("Create List Component With Coded Value and verify Label (.*) and category (.*)")
	def VerifyCodedValueLabelOnComponentCreationModal(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyCodedValueLabelOnComponentCreationModal'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Choice and Coded Value Label on form builder")
	def i_Verify_Choice_and_Coded_Value_Label_on_form_builder() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyCodedValueChoiceAndValueLabelOnFormBuilder'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I Verify Deactivated Component (.*) Should Not be present On Conditional Logic")
	def IVerifyDeactivatedComponentShuoldNotbepresentOnConditionalLogic(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyDeactivatedComponentShuoldNotbepresentOnConditionalLogic'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Verify Deactivated Option (.*) Should Not be present On Conditional Logic")
	def IVerifyDeactivatedOptionShuoldNotbepresentOnConditionalLogic(String DeactivatedOption) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyDeactivatedOptionShuoldNotbepresentOnConditionalLogic'),
				[('DeactivatedOption'):DeactivatedOption], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Verify Deactivated Option (.*) for (.*) Should Not be present On Preview")
	def IVerifyDeactivatedOptionShuoldNotbepresentOnPreview(String DeactivatedOption , String DeactivatedOptionComponent) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyDeactivatedOptionShuoldNotbepresentOnPreview'),
				[('DeactivatedOption'):DeactivatedOption , ('DeactivatedOptionComponent'):DeactivatedOptionComponent], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Verify Deactivated Component (.*) Should Not be present On Claculation")
	def IVerifyDeactivatedComponentShuoldNotbepresentOnCalculation(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyDeactivatedComponentShuoldNotbepresentOnCalculation'),
				[('component'):component], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Saved (.*) Math calculation present in behaviour and Logic")
	def verifySavedCalculation(String selectFunction) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifySavedMathCalculation'),
				[('selectFunction'):selectFunction], FailureHandling.STOP_ON_FAILURE)
	}
	@Then ("Verify Deactivated Component (.*) is removed from Calculate logic in (.*)")
	def verifyDeactivatedComponentRemoved(String deactivatedComponent,String numberComponent ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyDeactivatedComponentRemovedFromCalculation'),
				[('index'):deactivatedComponent,('component'):numberComponent], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Deactivating list option of (.*) not removed from calculate logic in (.*)")
	def verifyDeactivatedListOption(String deactivatedComponent,String numberComponent) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyDeactivatingListOption'),
				[('index'):deactivatedComponent,('component'):numberComponent], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Updating Label of (.*) will be updated in calculate logic of (.*)")
	def verifyLabelUpdating(String updatedComponent,String numberComponent) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyUpdatingLabelofQuestions'),
				[('index'):updatedComponent,('component'):numberComponent], FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Select 1st Component in single component form")
	def SelectSingleComponentInForm() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectComponentByindexforformwithsinglecomponent'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("I go to the components tab")
	def i_go_to_the_components_tab() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/clickOnComponentsTab'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("verify Availability property and its options")
	def verifyAvailability() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifyAvailabilityOptions'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Regular is selected as default Availability option")
	def verifyRegularOptionAsDefault() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifyRegularOptionisSelectedAsDefault'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Select Component by Index (.*) in form preview")
	def selectComponentByIndexInPreview(String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/SelectComponentInPreviewByIndex'), [('index'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify the Component (.*) is interactable in preview for Regular availability")
	def VerifyRegularOptionInPreview(String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/VerifyThecomponentisInteractableInpreviewforRegulaAvailability'), [('index'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify the Availability options can be changed during Mid study")
	def VerifyAvailabilityInMidstudy() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifyAvailabilityoptionsupdatedInMidStudy'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create Single List Component With Text coded value with Default Single Response Option (.*) and category (.*)")
	def CreateSingleListComponentWithTextcodedvaluewithDefaultSingleResponseOption(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/CreateSingleListComponentWithTextcodedvaluewithDefaultSingleResponseOption'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Single Response Option for List Component Creation")
	def VerifySingleResponseOptionforListComponentCreation() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/CreateListComponentWithDefaultSingleResponseOption'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Create Single List Component With Number coded value with Default Single Response Option (.*) and category (.*)")
	def CreateSingleListComponentWithNumbercodedvaluewithDefaultSingleResponseOption(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/CreateSingleListComponentWithNumbercodedvaluewithDefaultSingleResponseOption'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create Multi List Component With Text coded value with Default Single Response Option (.*) and category (.*)")
	def CreateMultiListComponentWithTextcodedvaluewithDefaultSingleResponseOption(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/CreateMultiListComponentWithTextcodedvaluewithDefaultSingleResponseOption'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}
	@And("Create Multi List Component With Number coded value with Default Single Response Option (.*) and category (.*)")
	def CreateMultiListComponentWithNumbercodedvaluewithDefaultSingleResponseOption(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/CreateMultiListComponentWithNumbercodedvaluewithDefaultSingleResponseOption'),
				[('componentLbl'):componentLbl, ('category'):category], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I verify the Single Response Option is available for List components")
	def IverifytheSingleResponseOptionisavailableforcomponents() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifySingleResponseOptionforListComponentinFormBuilderforSingleandMultiList'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Select component by (.*) name")
	def selectComponentByName(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/SelectComponentByNameInFormCanvas'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify show saved (.*) Math Calculation")
	def verifyShowSavedMathFunction(String selectFunction) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifySavedMathCalculation'),
				[('selectFunction'):selectFunction], FailureHandling.STOP_ON_FAILURE)
	}
	@Then ("Verify order of Math calculation (.*) and questions")
	def VerifyorderOfMathCalculation(String selectFunction) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyMathFunctionandQuestionsOrder'),
				[('selectFunction'):selectFunction], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Edit and Delete options present in Calculate rule Menu")
	def verifyEditandDelete() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyEditAndDeleteOptionsInMathCalculation'), null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Create a Float  Number component (.*) and category (.*)")
	def createFloatNumberComponen(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateFloatNumberComponentwithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select (.*) Math Function  and Add (.*) of constants for calculation")
	def selectMathFunctionAndAddConstants(String selectFunction,String count  ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/MathCalculationwithNumericConstants'), [('selectFunction'):selectFunction,('count'):count], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select (.*),(.*) for calculation")
	def selectSpecificQuestions(String component1, String component2) {

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddSpecificQuestions'), [('componentLbl'):component1, ('componentLbl1'):component2], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select (.*) in preview & pass input")
	def selectNumComponentByNameinPreview(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/SelectComponentByNameinPreview'), [('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select component (.*) and verify Mathfunction output of (.*) and (.*) and (.*)")
	def SelectComponentandVerifyMathOutput(String component, String component1, String component2, String selectFunction) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/SelectComponentandValidateMathOutput'), [('componentLbl'):component,('componentLbl1'):component1,('componentLbl2'):component2,('selectFunction'):selectFunction], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Select Hide on Capture option in Availability Section")
	def SelectHideonCaptureoptioninAvailabilitySection() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SelectHideonCaptureoptioninAvailabilitySection'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Ensure that the HideOnCapture component visible on Preview")
	def EnsurethattheHideOnCapturecomponentremainshiddeninthepreview() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/EnsurethattheHideOnCapturecomponentremainshiddeninthepreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Hide on Capture Availability option is selected in MidStudy")
	def VerifyHideonCaptureAvailabilityoptionisselectedinMidStudy() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyHideonCaptureAvailabilityoptionisselectedinMidStudy'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I Enter min date as {string} and  max date as {string}")
	public void i_Enter_min_date_as_and_max_date_as(String minDate, String maxDate) {

		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'min']))
		WebUI.sendKeys(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'min']), CommonUtils.getDate(Integer.parseInt(minDate)))

		SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MMM-yyyy");
		Date date = inputFormat.parse(CommonUtils.getDate(Integer.parseInt(minDate)));
		SimpleDateFormat outputFormat = new SimpleDateFormat("dd MMM yyyy");
		String minDateValue = outputFormat.format(date);
		CommonUtils.put("mindate",minDateValue )
		Date date1 = inputFormat.parse(CommonUtils.getDate(Integer.parseInt(maxDate)));
		SimpleDateFormat outputFormat1 = new SimpleDateFormat("dd MMM yyyy");

		String maxDateValue = outputFormat1.format(date1);
		CommonUtils.put("maxdate",maxDateValue )
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'max']))
		WebUI.sendKeys(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'max']), CommonUtils.getDate(Integer.parseInt(maxDate)))
		WebUI.takeScreenshot()
	}

	@When("I Enter only min date as {string}")
	public void i_Enter_min_date_only(String minDate) {
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'min']))
		WebUI.sendKeys(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/date_input_fields',[('field_name'):'min']), CommonUtils.getDate(Integer.parseInt(minDate)))

		SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MMM-yyyy");
		Date date = inputFormat.parse(CommonUtils.getDate(Integer.parseInt(minDate)));
		SimpleDateFormat outputFormat = new SimpleDateFormat("dd MMM yyyy");
		String minDateValue = outputFormat.format(date);
		CommonUtils.put("mindate",minDateValue )
		WebUI.takeScreenshot()
	}

	@When("I enter the oustside range date as {string}")
	public void i_enter_the_oustside_range_date_as(String outSideRangeDate) {
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/Preview/date_cmpnt_field'))
		WebUI.sendKeys(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/Preview/date_cmpnt_field'), CommonUtils.getDate(Integer.parseInt(outSideRangeDate)))
	}
	@Then("I Verify the  error message")
	public void i_Verify_the_error_message() {
		String ActulText=WebUI.getText(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/Preview/error_msg'))
		String ExpectedText="Date should be between " + CommonUtils.get("mindate") + " and " + CommonUtils.get("maxdate")
		WebUI.verifyMatch(ActulText, ExpectedText, false)
		WebUI.takeScreenshot()
	}
	@And("I Navigate to Properties page (.*)")
	def I_Navigate_to_Properties_page(String Component1) {
		Object component=  CommonUtils.get(Component1)
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Canvas/date_cmpnt_by_name',[('cmpnt_name'):component]))
		WebUI.verifyElementVisible(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/properties_header'))
	}

	@And("Select the restriction checkbox for Only allow Past or Present Date")
	def Select_restriction_checkbox_for_Only_allow_PastorPresent_Date() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnRestrictionCheckboxInFormProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Select the restriction checkbox for Only allow Past or Present Time")
	def Select_restriction_checkbox_for_Only_allow_PastorPresent_Time() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnTimeRestrictionCheckboxInFormProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Select the restriction checkbox for Only allow Past or Present datetime")
	def Select_restriction_checkbox_for_Only_allow_PastorPresent_datetime() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnDateTimeRestrictionCheckboxInFormProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I validate the restriction still exist after reopening for Date Component")
	def I_validate_restriction_still_exist_Date_Component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ValidateRestrictionCheckboxInFormProperties'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I validate the restriction still exist after reopening for Time Component")
	def I_validate_restriction_still_exist_Time_Component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ValidateRestrictionCheckboxInFormPropertiesTimeCmpt'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("I validate the restriction still exist after reopening for DateTime Component")
	def I_validate_restriction_still_exist_DateTime_Component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ValidateRestrictionCheckboxInFormPropertiesDateTime'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@Given("I Drag and Drop Date Component (.*)")
	def i_drag_and_drop_Date_component(String Component1) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/dragNdropViewerComponent'),
				[('Component1'):Component1], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Create viewer component (.*) and category (.*)")
	def create_viewer_component_with_category(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/createViewerCompWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Click On Add New Component Button inside Form Builder")
	def clickOnAddNewComponentButtonInsideFormBuilder() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnAddNewComponentButtonInsideFormBuilder'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Click On SaveAsDarft Button")
	def clickOnSaveAsDarftButton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ClickOnSaveAsDraft'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I verify the Expand And Collapse Response Options for Questions")
	def VerifyExpandAndCollapseResponseOptionsforQuestions() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/Expand_Collapse Response Options for Questions'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("Verify Decimal Precision Message On Canvas")
	def VerifyDecimalPrecisionMessageOnCanvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyDecimalPrecisionMessageOnCanvas'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Verify Show Decimal Precision Message on Field Focus On Preview")
	def VerifyShowDecimalPrecisionMessageonFieldFocusOnPreview() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyShowDecimalPrecisionMessageonFieldFocusOnpreview'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}

	@And("Verify Enable equal vertical sizing default cheked for Desktop modality")
	def VerifyEnableEqualVerticalSizingDefaultchekedForDesktopModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Enable equal vertical sizing default cheked for Desktop modality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("Verify Enable equal vertical sizing default uncheked for Desktop modality")
	def VerifyEnableEqualVerticalSizingDefaultUnchekedForDesktopModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Enable equal vertical sizing default uncheked for Desktop modality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Delete First component From Canvas")
	def i_Delete_component_From_canvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/DeleteComponentFromCanvasByName'), [:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Click On Desktop modality")
	def I_ClickOnDesktopModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnDesktopModality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Click On Tablet modality")
	def I_ClickOnTabletModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnTabletModality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Click On HandHeld modality")
	def I_ClickOnHandHeldModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnHandHeldModality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@And("Verify Enable equal vertical sizing default Cheked for Tablet modality")
	def VerifyEnableEqualVerticalSizingDefaultChekedForTabletModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Enable equal vertical sizing default cheked for Tablet modality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Drag and drop component (.*) and dropzone '(.*)'")
	def IDragAndDropAtDropzone(String Component, String dropzone) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/DragAndDropbyCOmponentNameAndLocation'), [('Component'):Component,('dropzone'):dropzone], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Verify Enable equal vertical sizing default Cheked for HandHeld modality")
	def VerifyEnableEqualVerticalSizingDefaultChekedForHandHeldModality() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Enable equal vertical sizing default cheked for HandHeld modality'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Create List component(.*) with Category(.*) of type '(.*)' and coded value tye '(.*)'")
	def createCustomListComponent(String component,String category, String listType,String codedValueType ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateCustomListComponent'), [('componentLbl'):component,('category'):category,('listType'):listType, ('codedValueType'):codedValueType], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("I verify Scale Setting On Component Creation Screen")
	def VerifyScaleSettingOnComponentCreationScreen() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ScaleSettingOnComponentCreationScreen'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Search Component For Edit Using Example")
	def SearchComponentForEditUsingExample() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/searchForComponentfromExamples'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I verify Scale Setting On Component Edit Screen")
	def VerifyScaleSettingOnComponentEditScreen() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ScaleSettingOnComponentEditScreen'),
				[:], FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Control Visibility of Show Coded Value during mid study change")
	def IControlVisibilityofShowCodedValueduringmidstudychange() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Control Visibility of Show Coded Value during mid-study change'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}

	@Then("Create viewer component (.*) with (.*) and ToolType '(.*)'")
	def createViewerComponentwithCategoryAndToolType(String componentLbl, String category, String toolType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateViewerComponentwithCategory'), [('componentLbl'):componentLbl,('category'):category,('toolType'):toolType], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select ImageViewer component (.*) and verify Image,Series fields are not present" )
	def verifyImageAndSeriesFieldsNotPresent(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyImageAndSeriesNotPresentInCalculation'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select Image viewer component (.*) and add attributes (.*) in calculation")
	def SelectImageViewerComponenAndAttributetoCalculation(String component,String attributes) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddSpecificQuestionswithFieldsofImageViewerComponent'), [('args'):component,('attributes'):attributes], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select (.*) and add it in Index (.*) for calculation")
	def AddSpecificquestionsInIndex(String component, String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddSpecificQuestionsinIndex'), [('componentLbl'):component,('questionIndex'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select the component (.*)")
	def selectQuestionForNestedCalculation(String selectGroup) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddQuestionsForNestedConditions'), [('selectGroup'):selectGroup], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then ("Click on Plus icon in calculation Expression")
	def ClickPlusIconOnCalculationExpression() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/ClickPlusIcon'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Matrix component present in component Library")
	def verifyMatrixInComponentLibrary() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyMatrixPresentInComponentLibrary'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Drag and Drop Matrix in Canvas")
	def DragAndDropMatrixInCanvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/AddMatrixtoCanvas'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Matrix (.*) label accepts upto 1024 characters")
	def MatrixLabelChange(String component ) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyMatrixLabelAcceptsupto1024Chars'), [('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("verify Matrix (.*) label Required validation error Messages")
	def matrixRequiredFeildValidation(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyMatrixRequiredFieldValidation'), [('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Click on List component button")
	def clickonListComponentButton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickOnListComponent'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify config coded value for (.*) with category (.*)")
	def VerifyConfigCodedValue(String component,String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyConfigCodedValue'), [('componentLbl'):component,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Coded value field is shown when Config coded value is checked and not shown when unchecked")
	def verifyConfigCodedvalueBehaviour() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyCodedValueisSHownAfterConfigCodedValueisCHecked'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Click on Add new component button in form Canvas")
	def clickOnAddNewComponentinFormCanvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/ClickonAddNewComponentinFormCanvas'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	//	@Then("Create List component(.*) with Category(.*) of type '(.*)' and coded value tye '(.*)'")
	//	def createCustomListComponent(String component,String category, String listType,String codedValueType ) {
	//		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateCustomListComponent'), [('componentLbl'):component,('category'):category,('listType'):listType, ('codedValueType'):codedValueType], FailureHandling.CONTINUE_ON_FAILURE)
	//	}
	@Then("verify config coded value check box rules in Edit component modal")
	def verifyconfigCodedValueRules() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyConfigCodedValueInEditComponentModal'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("select Image viewer component (.*) with Attribute '(.*)' and add it in Index (.*)")
	def addImageViewerComponentAttributes(String component, String attribute, String index) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/AddImageviewerComponentWithAttributeInCalculation'), [('componentLbl'):component,('attribute'):attribute,('questionIndex'):index], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Components (.*) and attribute '(.*)' present in Behaviour and logic")
	def verifyComponentsPresentInBAndL(String component, String attribute) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/MathFunctions/VerifyComponentsAddedIncalculationPresentInBehaviourAndLogic'), [('componentLbl'):component,('attribute'):attribute], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Drag and Drop (.*) Component into Matrix '(.*)' at '(.*)'")
	def dragAndDropComponentsInMatrix(String component, String matrixLabel, String dropzone) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/DragAndDrop/DragAndDropComponentInsideMatrix'), [('componentLbl'):component,('matrix'):matrixLabel,('dropzone'):dropzone], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Select Component from Matrix '(.*)' and Component (.*)")
	def selectComponentInsideMatrix(String matrixName, String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/SelectComponentInsideMatrix'), [('matrix'):matrixName,('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify the properties of List component in Matrix")
	def verifyPropertiesofListComponentInMatrix() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifythePropertiesofListInMatrix'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select First component added in Matrix '(.*)' and (.*) verify config coded value property is copied to all components")
	def verifyConfigCodedvaluePropertyforAllComponentsInMatrix(String matrixName, String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyConfigCodedValuePropertyCopiedforallComponentsInMatrix'), [('matrix'):matrixName,('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify adding list options for Matrix '(.*)' and components (.*)")
	def verifyAddingListOptions(String matrixName, String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyAddingOptionsInListcomponentcopiedtoOtherComponents'), [('matrix'):matrixName,('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Removing list options for Matrix '(.*)' and components (.*)")
	def verifyRemovingListOptionsInMatrix(String matrixName, String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyRemovingListOptionsInMatrix'), [('matrix'):matrixName,('componentLbl'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Select a component (.*) from IF DropDown")
	def selectComponentFromIFDropDown(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/ConditionalLogicSelectIfComponentDropDown'),[('component'):component] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Select the Number component (.*) and enter the input '(.*)' in preview")
	def passInputtoNumcomponentInPreview(String component, String input) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/ConditionalLogicInputForNumberComponentinpreview'),[('componentLbl'):component,('input'):input] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify Matrix Present in preview")
	def verifyMatrixPresentinPreview() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixPresentInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then ("Verify Matrix Not present in preview")
	def verifyMatrixNotPresentinPreview() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixNotPresentInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify the Matrix is Disabled in preview")
	def verifyMatrixDisabled() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixisDisabledInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify the Matrix is Not Disabled in preview")
	def verifyMatrixNotDisabled() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixIsNotDisabled'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}

	@And("Create Numeric Rating Scale component (.*) and category (.*)")
	def CreateNumericRatingScaleComponentWithCategory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateNumericRatingScaleComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	/*		@Given("Select the Number component (.*) and enter the input '(.*)' in preview")
	 def passInputtoNumcomponentInPreview(String component, String input) {
	 WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/ConditionalLogicInputForNumberComponentinpreview'),[('componentLbl'):component,('input'):input] ,FailureHandling.STOP_ON_FAILURE)
	 }
	 @Then("Verify Matrix Present in preview")
	 def verifyMatrixPresentinPreview() {
	 WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixPresentInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	 }
	 @Then ("Verify Matrix Not present in preview")
	 def verifyMatrixNotPresentinPreview() {
	 WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixNotPresentInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	 }
	 @Then("Verify the Matrix is Disabled in preview")
	 def verifyMatrixDisabled() {
	 WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixisDisabledInPreview'),null, FailureHandling.CONTINUE_ON_FAILURE)
	 }
	 @Then("Verify the Matrix is Not Disabled in preview")
	 def verifyMatrixNotDisabled() {
	 WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Matrix/VerifyMatrixIsNotDisabled'),null, FailureHandling.CONTINUE_ON_FAILURE)
	 }*/
	@Then("Verify '(.*)' component present in component Library")
	def verifyParticularInComponentLibrary(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyComponentPresentInComponentLibrary'),[('component'):component], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@When("Select component by '(.*)' name from canvas")
	def selectComponentByNameFromExamples(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/SelectComponentNameFromExample'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@When("I add section in canvas")
	def i_add_section_in_canvas() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/addSectionInCanvas'),[:], FailureHandling.STOP_ON_FAILURE)
	}

	@When("I select '(.*)' from canvas")
	def i_add_page_in_canvas(String page) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/clickScondPage'),[('page'):page], FailureHandling.STOP_ON_FAILURE)
	}

	//		@And("Create Numeric Rating Scale component (.*) and category (.*)")
	//		def CreateNumericRatingScaleComponentWithCategory(String componentLbl, String category) {
	//			WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateNumericRatingScaleComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	//		}

	@And("Create Horizontal Visual Analog Scale component (.*) and category (.*)")
	def CreateHorizontalVisualAnalogScaleComponentWithCategory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateHorizontalVisualAnalogScaleComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Create Vertical Visual Analog Scale component (.*) and category (.*)")
	def CreateVerticalVisualAnalogScaleComponentWithCategory(String componentLbl, String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/CreateVerticalVisualAnalogScaleComponentWithCategory'), [('componentLbl'):componentLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@And("Verify Min Max Text And Value For Scale Inside FormBuilder '(.*)'")
	def VerifyMinMaxTextAndValueInsideFormBuilder(String ScaleType) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyMinMaxTextAndValueInsideFormBuilder'), [('ScaleType'):ScaleType], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("verify that Number properties allows negative values")
	public void verify_that_Number_properties_allows_negative_values() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyThatNumberPropertiesAllowsNegativeValues'), null, FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify that error message appear when min number is more than max number")
	public void verify_that_error_message_appear_when_min_number_is_more_than_max_number() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyErrorMessageWhenMinNumberIsMoreThanMaxNumber'), null, FailureHandling.STOP_ON_FAILURE)
	}
	@Then("Verify that negative numbers can be entered")
	public void verify_that_negative_numbers_can_be_entered() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatNegativeNumbersCanBeEntered'), null, FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify error message appears when the boundaries of the Entry Limit are met")
	public void verify_error_message_appears_when_the_boundaries_of_the_Entry_Limit_are_met() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyErrorMessageAppearsWhenTheBoundariesOfTheEntryLimitAreMet'), null, FailureHandling.STOP_ON_FAILURE)
	}


	@When("click Spinner under layout options")
	public void click_Spinner_under_layout_options() {
		WebUI.callTestCase(findTestCase('Test Cases/TestSteps/TestStartStep'),['stepDescription': "click Spinner under layout options"])
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/Layout/spinner_layout'))
	}
	@Given("Verify that the number spinner displays correctly based on the negative number entry limit")
	public void verify_that_the_number_spinner_displays_correctly_based_on_the_negative_number_entry_limit() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatTheNumberSpinnerDisplaysCorrectlyBasedOnTheNegativeNumberEntryLimit'), null, FailureHandling.STOP_ON_FAILURE)
	}
	@Then("verify negative numbers can be selected within the set boundaries.")
	public void verify_negative_numbers_can_be_selected_within_the_set_boundaries() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyTheNegativeNumbersCanBeSelectedOnSpinnerInPreview'), null, FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify that negative numbers can be entered for float component")
	public void verify_that_negative_numbers_can_be_entered_for_float_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyThatNegativeNumbersCanBeEnteredForFloatComponent'), null, FailureHandling.STOP_ON_FAILURE)
	}

	@Then("Verify error message appears when the boundaries of the Entry Limit are met for float component")
	public void verify_error_message_appears_when_the_boundaries_of_the_Entry_Limit_are_met_for_float_component() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyErrorMessageAppearsWhenEntryLimitBoundariesMetForFloatComponent'), null, FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Select Configure Coded Values and Show Coded Value during Form Completion")
	public void select_Configure_Coded_Values_and_Show_Coded_Value_during_Form_Completion() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/checkTheShowCodedValueCheckBoxOnProperties'), null)
	}

	@Then("Verify that negative numbers can be placed in the Coded Value")
	public void verify_that_negative_numbers_can_be_placed_in_the_Coded_Value() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyNegativeNumbersAllowedInCodedValue'), null)
	}

	@Then("Verify negative numbers can be are displayed within the Coded Value.")
	public void verify_negative_numbers_can_be_are_displayed_within_the_Coded_Value() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyNegativeNumbersDisplayedInCodedValue') ,null)
	}
	@When("Enter all necessary answers and proceed to page two")
	public void enter_all_necessary_answers_and_proceed_to_page_two() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/enterRequiredAnswersAndGoToPageTwo'), null)
	}
	@Then("Verify that negative numbers can be entered in all Image Viewer Components")
	public void verify_that_negative_numbers_can_be_entered_in_all_Image_Viewer_Components() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyNegativeNumberInputInImageViewer'), null)
	}
	@When("On the Form Designer change the Integer and Float Component back to TextBox")
	public void on_the_Form_Designer_change_the_Integer_and_Float_Component_back_to_TextBox(DataTable dataTable) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/revertIntegerAndFloatComponentsToTextBox'), [('dataTable'):dataTable.asList()])
	}

	@Given("Able to create calculation and calculation works correctly")
	public void able_to_create_calculation_and_calculation_works_correctly() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifyCalculationWorksCorrectly'), null)
	}
	@Then("Verify listcompnent present when rule logic is met")
	public void verify_listcompnent_present_when_rule_logic_is_met() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/verifyListComponentVisibleWhenRuleMet'), null)
	}
	@When("edit the caliculation with {string} and the value {string}")
	public void edit_the_caliculation_with_and_the_value(String mathfunction, String value) {

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/editCaliculation'), [('MathFunction'):mathfunction,('value'):value])
	}
	@Then("Verify the Caliculation with value {string} and it results {string}")
	public void verify_the_Caliculation_with_value_and_it_results(String input, String output) {

		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/VerifytheCaliculation'), [('input'):input,('output'):output])
	}


	//		@When("Select component by '(.*)' name from canvas")
	//		def selectComponentByNameFromExample(String componentLbl) {
	//			WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/SelectComponentNameFromExample'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	//		}
	@Then("Rename Table in index'(.*)' name '(.*)' and updated name '(.*)'")
	def RenametheTable(String index,String tableName, String updatedName) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/Table/RenametheTable'), [('index'):index,('tableName'):tableName,('updatedName'):updatedName], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Click on Optional checkBox")
	def ClickOnOptionalCheckBox() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnOptionalCheckBox'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify - Display optional next to non-required question checkbox is selected by default")
	def verifyDisplayOptionalCheckBox() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifyDisplayOptionalCheckboxSelectedBydefault'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Select component (.*) in preview")
	def selectAndClickOnComponentInPreview(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/ComponentSelectionInPreviewByName'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify optional Text Present in Preview for component (.*)")
	def verifyOptionaTextPresentInPreview(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/VerifyOptionalTextPresentInPreview'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}

	@Then("Verify optional Text Not Present in Preview for component (.*)")
	def verifyOptionaTextNotPresentInPreview(String componentLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Preview/VerifyOptionaTextNotPresentInPreview'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Click on Display Optional CheckBox")
	def clickOnDisplayOptionalCheckBox() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnDisplayOptionalTextCheckBox'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify Exclusive Options Drop Down Present in Properties of Multi select List")
	def verifyMutuallyExclusiveDropDown() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/VerifyExclusiveOptionsDropDownAvailableForMultiSelectList'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@When("Click on Create Form Button")
	def clickOnCreateFormButton() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/ClickOnCreateFormButton'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify SDTM Category present in create Form Modal")
	def verifySDTMCategoryinCreateFormModal() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifySDTMCategoryFieldPresentInFormCreationModal'),null, FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify SDTM Category Autofilled with Form label (.*)")
	def verifySDTMCategoryisAutoFilled(String formLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifySDTMCategoryFieldisFilledWithFormLabel'), [('formLbl'):formLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify SDTM Category field is Editable '(.*)'")
	def verifySDTMCategoryisEditable(String categoryValue) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifySDTMCategoryisEditable'), [('categoryValue'):categoryValue], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify SDTM Category Required Field Validations for (.*) with (.*)")
	def verifySDTMCategoryRequiredFieldValidations(String formLbl,String category) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifyRequiredFieldValidationforSDTMCategory'), [('formLbl'):formLbl,('category'):category], FailureHandling.CONTINUE_ON_FAILURE)
	}
	@Then("Verify save form with SDTM Category for (.*)")
	def verifySaveFormwithSDTMCategory(String formLbl) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/VerifySaveFormWithSDTMCategory'), [('formLbl'):formLbl], FailureHandling.CONTINUE_ON_FAILURE)
	}

	//@When("Select component by '(.*)' name from canvas")
	//def selectComponentByNameFromExample(String componentLbl) {
	//	WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/components/SelectComponentNameFromExample'), [('componentLbl'):componentLbl], FailureHandling.CONTINUE_ON_FAILURE)
	//}
	//@Then("Rename Table in index'(.*)' name '(.*)' and updated name '(.*)'")
	//def RenametheTable(String index,String tableName, String updatedName) {
	//	WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/Forms/Table/RenametheTable'), [('index'):index,('tableName'):tableName,('updatedName'):updatedName], FailureHandling.CONTINUE_ON_FAILURE)
	//}
	@Given("Select Number component (.*) and Verify Error Message Present For Float in preview")
	def NumcomponentErrorMessageValidationforFloatInPreview(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/NumComponentErrorMessageValidationforFloatInPreview'),[('componentLbl'):component] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Select Number component (.*) and Verify Error Message Present For Integer in preview")
	def NumcomponentErrorMessageValidationforINTInPreview(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/NumComponentErrorMessageValidationforINTInPreview'),[('componentLbl'):component] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Select Number component (.*) and Verify Error Message Not Present in preview")
	def NumcomponentErrorMessageNotPresentInPreview(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/NumComponentErrorMessageNotPresentInPreview'),[('componentLbl'):component] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Given("Select the Number component (.*) and Verify Remove Rounding For Number Component in preview '(.*)'")
	def VerifyRemoveRoundingForNumcomponentInPreview(String component, String input) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/NumComponentRemoveRoundingInPreview'),[('componentLbl'):component,('input'):input] ,FailureHandling.STOP_ON_FAILURE)
	}
	@And("I Configure Number Component With Min '(.*)' And Max '(.*)' Value")
	def ConfigureNumberComponentWithMinAndMaxValue(String MinValue, String MaxValue) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/ConfigureNumberComponentWithMinAndMaxValue'),[('MinValue'):MinValue,('MaxValue'):MaxValue] ,FailureHandling.STOP_ON_FAILURE)
	}
	@Then("I Performed Real Time Validation On Number Component (.*)")
	def IPerformedRealTimeValidationOnNumberComponent(String component) {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/PerformedRealTimeValidationOnNumberComponent'),[('componentLbl'):component] ,FailureHandling.STOP_ON_FAILURE)
	}

	//	Then verify entry limit checkbox is selected and disabled
	//	Then verify <minNo> and <maxNo> feilds are working as expected

	@When("I click on textbox radio button")
	def clickOnTextboxRadioButton() {
		//		WebUI.enhancedClick(findTestObject('Object Repository/Forms_Engine/NumberCompMinMax/FormPropertiesButton'), FailureHandling.STOP_ON_FAILURE)
		WebUI.enhancedClick(findTestObject('Object Repository/Forms_Engine/ComponentsTable/action_menu_icon_by_index',[('index'):1]))
		//		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SpinnerTestCases/ClickOnSpinnerRadioButton'), null,FailureHandling.CONTINUE_ON_FAILURE)
		WebUI.waitForElementPresent(findTestObject('Object Repository/Forms_Engine/NumberCompMinMax/textbox_number_comp_property'), 30)
		WebUI.enhancedClick(findTestObject('Object Repository/Forms_Engine/NumberCompMinMax/textbox_number_comp_property'), 2)

		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/Spinner/EntryLimit_checkbox'), 5, FailureHandling.STOP_ON_FAILURE)

		//minval box
		WebUI.verifyElementNotClickable(findTestObject('Object Repository/Forms_Engine/Spinner/Min_val_Txt_Box'), FailureHandling.STOP_ON_FAILURE)

		//entry checkbox click
		WebUI.enhancedClick(findTestObject('Object Repository/Forms_Engine/Spinner/EntryLimit_checkbox'), FailureHandling.STOP_ON_FAILURE)
		WebUI.verifyElementChecked(findTestObject('Object Repository/Forms_Engine/Spinner/EntryLimit_checkbox'), 5, FailureHandling.STOP_ON_FAILURE)

		def minValue = WebUI.getText(findTestObject('Object Repository/Forms_Engine/Spinner/Min_val_Txt_Box'))
		printf("minValue =========="+ minValue)


		WebUI.setText(findTestObject('Object Repository/Forms_Engine/Spinner/Min_val_Txt_Box'), 10)
		//		WebUI.verifyElementChecked(findTestObject('Object Repository/Forms_Engine/Spinner/EntryLimit_checkbox'), 5, FailureHandling.STOP_ON_FAILURE)
		//		WebUI.verifyElementNotClickable(findTestObject('Object Repository/Forms_Engine/Spinner/EntryLimit_checkbox'), FailureHandling.STOP_ON_FAILURE)
	}
	
	@When("Login to the application and navigate to the forms page with id")
	def loginAndNavigateToFormsPage() {
		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Alchemist/LoginToGsso_NaviageToForm_withId'), ["url":'https://portal.int.ert.com/forms/2474d795-7fb7-48d5-b061-8d16463832b0'], FailureHandling.STOP_ON_FAILURE)
	}
	

	def WebElement getElementWithText(String rootElement, String selector, String text) {
		return (WebElement) WebUI.executeJavaScript(
				"""
                  return [...document.querySelector(arguments[0]).shadowRoot.querySelectorAll(arguments[1])]
                         .find(el => el.textContent.trim().includes(arguments[2]));
                 }
                 """,
				Arrays.asList(rootElement, selector, text))
	}

	def WebElement getElement(String rootElement, String selector) {
		return (WebElement) WebUI.executeJavaScript("return document.querySelector(arguments[0]).shadowRoot.querySelector(arguments[1]);",
				Arrays.asList(rootElement, selector))
	}

	@Then("I verify the skip dialog box is appeared and can be closed and proceed without answering the form")
	def skipDialogBoxValidation() {
		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/form_logic_tab'), 30)
//		getElement("app-scoped-styles", "[data-testid^='optional-checkbox']").click()
		WebUI.enhancedClick(findTestObject('Object Repository/Forms_Alchemist/OptionalQuestionSkipFunc/OptionalCheckbox'), FailureHandling.STOP_ON_FAILURE)
		
		getElement("app-scoped-styles", "[data-testid='property-allowSkipingOptionQuestion']").click()
	}

	@Then("Click on the component textbox header")
	def clickOnTheFirstComponentTextbox() {
		//		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/form_logic_tab'))
		WebUI.verifyElementPresent(findTestObject('Object Repository/Forms_Engine/FormDesign/Properties/form_logic_tab'), 30)
		getElement("app-scoped-styles", ".inline-text.ng-star-inserted").click()
		getElement("app-scoped-styles", "form .rich-text-editor.ng-star-inserted>div~div").click()
	}

	@Then('Validate the skip checkbox functionalities for optional component')
	def validateSkipCheckboxFunctionalities() {
		def componentTextBefore = getElement("app-scoped-styles", "label-content rich-text").getText()
		def dialogBox = getElementWithText("app-scoped-styles", ".dialog__article", "Are you sure you want to skip this question?")
		getElementWithText("app-scoped-styles", "button", "Cancel").click()
		def component1TextAfter = getElement("app-scoped-styles", "label-content rich-text").getText()
		assertEquals(componentTextBefore, component1TextAfter)
		WebUI.verifyElementClickable(findTestObject('Object Repository/Forms_Engine/FormDesign/Preview/FormNextOrSubmitButton'))
		WebUI.click(findTestObject('Object Repository/Forms_Engine/FormDesign/Preview/FormNextOrSubmitButton'))
		getElementWithText("app-scoped-styles", "button", "Yes, skip").click()
		def component2Text = getElement("app-scoped-styles", "label-content rich-text").getText()
		assertNotEquals(component1TextAfter, component2Text)
	}

	@Then



	//	@Then("verify entry limit checkbox is selected and disabled")
	//	def verifyEntryLimitIsChecked() {
	//		WebUI.callTestCase(findTestCase('Test Cases/Web/BDD_Tests/SpinnerTestCases/VerifyEntryLimitIsSelectedAndDisabled'), null,FailureHandling.CONTINUE_ON_FAILURE)
	//	}

	//	When I Click on Optional checkbox
	//	When I save as draft
	//	When I click preview
	//	Then I validate
}
