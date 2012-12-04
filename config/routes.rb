Ganga::Application.routes.draw do

  
  devise_scope :account do                                      
    match '/account/confirmations' => 'accounts/confirmations#update', :via => :put, :as => :update_account_confirmation 

    post "invite_request", :to => "accounts/registrations#invite_account_request", :as => "save_account_request"     
  end

  # devise_for :accounts
  devise_for :accounts, :controllers => { 
                                          :registrations => "accounts/registrations",
                                          :sessions => "accounts/sessions",
                                          :confirmations => "accounts/confirmations",
                                          :unlocks => "accounts/unlocks",
                                          :passwords => "accounts/passwords"
                                        }
  
  get   '/credentials',       :to => 'accounts#credentials'
  get   '/category',          :to => 'rules#category'
 
  # Actor Api
  post  '/actor/create',      :to => 'actors#create'
  post  '/actor/delete',      :to => "actors#delete"
  get   '/actor/read',        :to => 'actors#read'
  post  '/actor/identify',    :to => 'actors#identify'
  post  '/actor/set',         :to => 'actors#set'
  post  '/actor/alias',       :to => 'actors#alias'



  # App Api
  post  '/app/create',        :to => 'apps#create'
  get   '/app/read',          :to => 'apps#read'
  post  '/app/update',        :to => 'apps#update'
  post  '/app/delete',        :to => 'apps#delete'
  

  # Event Api
  post '/event/create',       :to => 'events#create'
 
  # Account Api
  get  '/account/read',       :to => 'accounts#read'
  get  '/account/list_apps',  :to => 'accounts#list_apps'

  # Rule Api
  post '/rule/create',        :to => "rules#create"
  post '/rule/update',        :to => "rules#update"
  get  '/rule/read',          :to => "rules#read"
  post '/rule/delete',        :to => "rules#delete"

  # Conversion Api
  post '/conversion/create',  :to => "conversions#create"

  # Error Api
  post '/err/create',         :to => "errs#create"
  
  # Some browsers send an options request to the server first, 
  # to make sure the correct access headers are set.
  # We need to catch this in Rails, returning a 200 status with the correct headers.
  match '*all' => 'application#authenticate_origin!', constraints: {method: 'OPTIONS'}

  match '/:locale' => 'base#index'                                    
  root :to => "base#index"
  

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end

