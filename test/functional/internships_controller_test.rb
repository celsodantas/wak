require 'test_helper'

class InternshipsControllerTest < ActionController::TestCase
  setup do
    @internship = internships(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:internships)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create internship" do
    assert_difference('Internship.count') do
      post :create, :internship => @internship.attributes
    end

    assert_redirected_to internship_path(assigns(:internship))
  end

  test "should show internship" do
    get :show, :id => @internship.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @internship.to_param
    assert_response :success
  end

  test "should update internship" do
    put :update, :id => @internship.to_param, :internship => @internship.attributes
    assert_redirected_to internship_path(assigns(:internship))
  end

  test "should destroy internship" do
    assert_difference('Internship.count', -1) do
      delete :destroy, :id => @internship.to_param
    end

    assert_redirected_to internships_path
  end
end
