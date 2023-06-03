using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MQTTnet;
using MQTTnet.Client.Options;
using MQTTnet.Extensions.ManagedClient;
using CallSystem.Models;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json;
namespace CallSystem.Models
{
    
    //[Route("[controller]")]
    public class Mqtt : Controller
    {
        private readonly ILogger<Mqtt> _logger;

        public Mqtt(ILogger<Mqtt> logger)
        {
            _logger = logger;
        }

        public static Dictionary<string, int> mmap = new Dictionary<string, int>()
                {  
                    {"DBCS-020", 0},
                    {"DBCS-021", 0},
                    {"DBCS-016", 0},
                    {"DBCS-017", 0},
                    {"DBCS-024", 0},
                    {"DBCS-019", 0},
                    {"DBCS-022", 0},
                    {"DBCS-023", 0},
                    {"DBCS-026", 0},
                    {"DBCS-018", 0},
                    {"DBCS-025", 0},
                    {"AFSM-001", 0},
                    {"AFSM-002", 0},
                    {"AFSM-003", 0},
                    {"AFSM-004", 0},
                    {"HOPS-001", 0},
                    {"APBS-001", 0},
                    {"HSTS-002", 0},
                    {"SPSS-001", 0},
                    {"AFCS-001", 0},
                    {"AFCS-002", 0},
                    {"AFCS-003", 0},
                    {"AFCS-004", 0},
                    {"AFCS-005", 0},
                    {"AFCS-006", 0},
                    {"AFCS-007", 0},
                    {"AFCS-008", 0},
                    {"DIOSS-004", 0},
                    {"DIOSS-008", 0},
                    {"DIOSS-007", 0},
                    {"DIOSS-006", 0},
                    {"DIOSS-005", 0},
                    {"DBCS-010", 0},
                    {"DBCS-011", 0},
                    {"DBCS-012", 0},
                    {"DBCS-013", 0},
                    {"DBCS-014", 0},
                    {"DBCS-015", 0},
                    {"HOPS-002", 0},
                    {"CIOSS-002", 0},
                    {"CIOSS-001", 0},
                    {"USS-001", 0}

                };

        public IActionResult Index()
        {  
             
             async Task MqttListener()
                {
                    string clientId = Guid.NewGuid().ToString();
                    string mqttURI = "127.0.0.1";
                    int mqttPort = 1883;

                    var options = new ManagedMqttClientOptionsBuilder()
                        .WithAutoReconnectDelay(TimeSpan.FromSeconds(5))
                        .WithClientOptions(new MqttClientOptionsBuilder()
                            .WithClientId(clientId)
                            .WithTcpServer(mqttURI, mqttPort))
                    .Build();
                    var mqttClient = new MqttFactory().CreateManagedMqttClient();
                    await mqttClient.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic("maintenance/calls/+").Build());
                    await mqttClient.StartAsync(options);

                    mqttClient.UseConnectedHandler(e =>
                    {
                        Debug.WriteLine("Connected successfully with MQTT Broker.");
                    }
                    );
                    mqttClient.UseDisconnectedHandler(e =>
                    {
                        Debug.WriteLine("Disconnected from MQTT Broker.");
                    }
                    );
                    
                    mqttClient.UseApplicationMessageReceivedHandler(e =>
                    {
                        
                        
                        try
                        {
                            string topic = e.ApplicationMessage.Topic;
                            if (string.IsNullOrWhiteSpace(topic) == false)
                            
                                {
                                   var payload = e.ApplicationMessage.ConvertPayloadToString();
                                   System.Console.WriteLine($"Payload is {payload}");
                                   var deserializedJson = JsonConvert.DeserializeObject<Dictionary<string,int>>(payload);
                                   if (deserializedJson is not null)
                                   {
                                        foreach( KeyValuePair<string, int> kvp in deserializedJson)
                                   {    
                                       mmap[kvp.Key] = kvp.Value;
                                       System.Console.WriteLine($"Machine {kvp.Key} has been set to {kvp.Value}");
                                    }
                                   }
                                   
                                    

                                }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message, ex);
                        }

                    });
                }
            return View(MqttListener());
        }
        public IActionResult CallStatus()
        {              
            ViewBag.mmap = mmap;
            return View(); 
        } 
        public IActionResult CallsFormatted()
        {              
            ViewBag.mmap = mmap;
            return View(); 
        } 

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}