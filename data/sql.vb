Imports System.Data.SqlClient
Imports Newtonsoft.Json.Linq

Public Class sql
    Public Function SummaryData(token_id As String) As JObject
        Dim jReturn As New JObject
        Dim sql_string As String = "select top(1) *, (SELECT up.name  FROM user_portfolios up where up.id = portfolio_id ) as portfolio_name FROM [user_contracts] WHERE token_id = @token_id and ecosystem_build_status = 'Complete'"
        Dim cn As New SqlConnection("connection_string")
        Dim cmd As New SqlCommand(sql_string, cn)
        Dim ptoken_id As New SqlParameter("@token_id", token_id)
        cmd.Parameters.Add(ptoken_id)
        Dim da As New SqlDataAdapter(cmd)
        Dim dt As New DataTable("SummaryData")
        Try
            da.Fill(dt)
        Catch ex As Exception
            Dim stopme As String = ex.ToString
        End Try
        Dim jpDiscovery As New JProperty("discovery")
        If dt.Rows.Count = 0 Then
            jpDiscovery.Value = "unknown"
            jReturn.Add(New JProperty("tr_Score", "0"))
            jReturn.Add(New JProperty("url", ""))
        Else
            jpDiscovery.Value = "known"
            jReturn.Add(New JProperty("companyname", dt.Rows(0).Item("companyname").ToString))
            jReturn.Add(New JProperty("company_status_description", dt.Rows(0).Item("company_status_description").ToString))
            jReturn.Add(New JProperty("company_country", dt.Rows(0).Item("company_country").ToString))
            jReturn.Add(New JProperty("tr_Score", dt.Rows(0).Item("tr_Score").ToString))
            jReturn.Add(New JProperty("score_credit_rating_label", dt.Rows(0).Item("score_credit_rating_label").ToString))
            jReturn.Add(New JProperty("portfolio_name", dt.Rows(0).Item("portfolio_name").ToString))
            Dim qlik As String = "https://qlik.riscvision.com/sense/app/096602c0-768a-4ff9-9d18-1d5150021ec2/sheet/66e0d5d1-37ad-4703-af13-b9ff4872363c/state/analysis/options/clearselections/select/Portfolio/Crypto"
            jReturn.Add(New JProperty("url", qlik))
        End If
        jReturn.Add(jpDiscovery)

        Return jReturn
    End Function
End Class
