class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google
    @socialaccount = SocialAccount.find_for_google(request.env['omniauth.auth'])

    if @socialaccount.persisted?
      flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in_and_redirect @socialaccount, event: :authentication
    else
      session['devise.google_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end
  end