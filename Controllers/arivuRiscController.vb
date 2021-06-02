Imports System.Net
Imports System.Web.Http
Imports Newtonsoft.Json.Linq

Namespace Controllers

    Public Class arivuRiscController
        Inherits ApiController

        ' GET: api/arivuRisc
        'Public Function GetValues() As IEnumerable(Of String)
        '    Return New String() {"value1", "value2"}
        'End Function

        ' GET: api/arivuRisc/5
        Public Function GetValue(ByVal id As String) As JObject
            Dim clssql As New sql

            Return clssql.SummaryData(id)
        End Function

        '' POST: api/arivuRisc
        'Public Sub PostValue(<FromBody()> ByVal value As String)

        'End Sub

        '' PUT: api/arivuRisc/5
        'Public Sub PutValue(ByVal id As Integer, <FromBody()> ByVal value As String)

        'End Sub

        '' DELETE: api/arivuRisc/5
        'Public Sub DeleteValue(ByVal id As Integer)

        'End Sub
    End Class
End Namespace