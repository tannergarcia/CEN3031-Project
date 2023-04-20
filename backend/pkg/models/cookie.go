package models

type CookieModel struct {
	Name    string `json:"session_token"`
	Value   string `json:"sessionToken"`
	Expires string `json:"expiresAt"`
}
